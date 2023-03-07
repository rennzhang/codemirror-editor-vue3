import minimist from "minimist";
import fs from "fs";
import path from "path";
import semver from "semver";
import { execa } from "execa";
import colors from "picocolors";
// import { prompt } from "enquirer";
import prompts from "prompts";
import { version as currentVersion } from "../package.json";
import {
  args,
  run,
  runIfNotDry,
  getVersionChoices,
  step,
  updateVersions,
  syncPushCode,
} from "./releaseUtils";

const isDryRun = args.dry;

async function main() {
  let targetVersion: string = args._[0];

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release }: { release: string } = await prompts({
      type: "select",
      name: "release",
      message: "Select release version",
      choices: getVersionChoices(currentVersion),
    });

    if (release === "custom") {
      const res: { version: string } = await prompts({
        type: "text",
        name: "version",
        message: "Input custom version",
        initial: currentVersion,
      });
      targetVersion = res.version;
    } else {
      targetVersion = release;
    }
  }
  if (targetVersion.includes("beta") && !args.tag) {
    args.tag = "beta";
  }
  if (targetVersion.includes("alpha") && !args.tag) {
    args.tag = "alpha";
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes }: { yes: boolean } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Releasing ${colors.yellow(targetVersion)} Confirm?`,
  });

  if (!yes) {
    return;
  }

  // update all package versions and inter-dependencies
  step("\nUpdating cross dependencies...");
  updateVersions(targetVersion);

  // generate changelog
  step("\nGenerating changelog...");
  await run("npm", ["run", "changelog"]);

  const { stdout } = await run("git", ["diff"], { stdio: "pipe" });
  if (stdout) {
    step("\nCommitting changes...");
    await runIfNotDry("git", ["add", "-A"]);
    await runIfNotDry("git", ["commit", "-m", `release: v${targetVersion}`]);
  } else {
    console.log("No changes to commit.");
  }

  await syncPushCode(targetVersion);

  if (args.tag === "beta") {
    step("publish packages for beta...");
    await run("npm", ["publish", "--tag=beta"]);
  } else {
    step("publish packages for official...");
    await run("npm", ["publish"]);
  }

  if (isDryRun) {
    console.log("\nDry run finished - run git diff to see package changes.");
  }
}

main().catch((err) => {
  console.error(err);
});
