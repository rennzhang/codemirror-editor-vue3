/* eslint-disable @typescript-eslint/no-var-requires */
const args = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const semver = require("semver");
const execa = require("execa");
const { prompt } = require("enquirer");
const currentVersion = require("../package.json").version;

const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]);
const isDryRun = args.dry;

const versionIncrements = ["repair", "patch", "minor", "major"];

const inc = (i) => {
  if (i === "repair") {
    return preId
      ? semver.inc(currentVersion, "prerelease", preId)
      : `${currentVersion}-1`;
  }
  return semver.inc(currentVersion.split("-")[0], i);
};
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "inherit", ...opts });
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(" ")}`), opts);
const runIfNotDry = isDryRun ? dryRun : run;
const step = (msg) => console.log(chalk.cyan(msg));

// 获取当前所在分支名称
function getCurrentBranch() {
  const res = execa.commandSync("git rev-parse --abbrev-ref HEAD");
  return res.stdout;
}

async function main() {
  let targetVersion = args._[0];

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: "select",
      name: "release",
      message: "Select release type",
      choices: versionIncrements
        .map((i) => `${i} (${inc(i)})`)
        .concat(["custom"]),
    });

    if (release === "custom") {
      targetVersion = (
        await prompt({
          type: "input",
          name: "version",
          message: "Input custom version",
          initial: currentVersion,
        })
      ).version;
    } else {
      targetVersion = release.match(/\((.*)\)/)[1];
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes } = await prompt({
    type: "confirm",
    name: "yes",
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!yes) {
    return;
  }

  // update all package versions and inter-dependencies
  step("\nUpdating cross dependencies...");
  updateVersions(targetVersion);

  // // build all packages with types
  // step("\nBuilding all packages...");
  // if (!skipBuild && !isDryRun) {
  //   await run("npm", ["run", "build"]);
  //   // test generated dts files
  // } else {
  //   console.log("(skipped)");
  // }

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

  // 推送代码到仓库
  const syncPushCode = async () => {
    // 推送当前分支代码
    step(`\n[Branch ${getCurrentBranch()}] Pushing to GitLab...`);
    await runIfNotDry("git", ["tag", `v${targetVersion}`]);
    await runIfNotDry("git", ["push", "origin", `refs/tags/v${targetVersion}`]);
    await runIfNotDry("git", ["push"]);
  };

  await syncPushCode();

  step("publish all packages...");
  await run("npm", ["run", "publish-pkg"]);

  if (isDryRun) {
    console.log("\nDry run finished - run git diff to see package changes.");
  }

  console.log();
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.version = version;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

function updateVersions(version) {
  updatePackage(path.resolve(__dirname, "../"), version);
}

main().catch((err) => {
  updateVersions(currentVersion);
  console.error(err);
});
