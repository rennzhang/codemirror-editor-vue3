/**
 * modified from https://github.com/vuejs/core/blob/master/scripts/release.js
 */
import path from "node:path";
import colors from "picocolors";
import type { Options as ExecaOptions, ExecaReturnValue } from "execa";
import { execa } from "execa";
import semver from "semver";
import fs from "fs";
import minimist from "minimist";
import chalk from "chalk";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url); // 这里不能声明__filename,因为已经有内部的__filename了，重复声明会报错
export const __dirname = path.dirname(filename);

export const args = minimist(process.argv.slice(2));

export const isDryRun = !!args.dry;
export async function run(
  bin: string,
  _args: string[],
  opts: ExecaOptions<string> = {}
): Promise<ExecaReturnValue<string>> {
  return execa(bin, _args, { stdio: "inherit", ...opts });
}

export async function dryRun(
  bin: string,
  _args: string[],
  opts?: ExecaOptions<string>
): Promise<void> {
  return console.log(colors.blue(`[dryrun] ${bin} ${_args.join(" ")}`), opts || "");
}

export const step = (msg) => console.log(chalk.cyan(msg));

export const runIfNotDry = isDryRun ? dryRun : run;

interface VersionChoice {
  title: string;
  value: string;
}
export function getVersionChoices(currentVersion: string): VersionChoice[] {
  console.log("===== currentVersion", currentVersion);
  const currentBeta = currentVersion.includes("beta");
  const currentAlpha = currentVersion.includes("alpha");
  const isStable = !currentBeta && !currentAlpha;

  function inc(i: any, tag = currentAlpha ? "alpha" : "beta") {
    return semver.inc(currentVersion, i, tag) as string;
  }

  let versionChoices: VersionChoice[] = [
    {
      title: "next",
      value: inc(isStable ? "patch" : "prerelease")
    }
  ];

  if (isStable) {
    versionChoices.push(
      {
        title: "beta-minor",
        value: inc("preminor")
      },
      {
        title: "beta-major",
        value: inc("premajor")
      },
      {
        title: "alpha-minor",
        value: inc("preminor", "alpha")
      },
      {
        title: "alpha-major",
        value: inc("premajor", "alpha")
      },
      {
        title: "minor",
        value: inc("minor")
      },
      {
        title: "major",
        value: inc("major")
      }
    );
  } else if (currentAlpha) {
    versionChoices.push({
      title: "beta",
      value: `${inc("patch")}-beta.0`
    });
  } else {
    versionChoices.push({
      title: "stable",
      value: inc("patch")
    });
  }
  versionChoices.push({ value: "custom", title: "custom" });

  versionChoices = versionChoices.map((i) => {
    // eslint-disable-next-line no-param-reassign
    i.title = `${i.title} (${i.value})`;
    return i;
  });

  return versionChoices;
}

// 推送代码到仓库
export const syncPushCode = async (targetVersion: string) => {
  await runIfNotDry("git", ["tag", `v${targetVersion}`]);
  await runIfNotDry("git", ["push", "origin", `refs/tags/v${targetVersion}`]);
  await runIfNotDry("git", ["push"]);
};

export function updateVersions(version) {
  const pkgPath = path.resolve(__dirname, "../package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.version = version;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}
