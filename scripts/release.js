/**
 * 发版规范：
 * 1. 版本号由产品经理统一规定，如 2.0.0
 * 2. 开发在修复 bug 时，在版本号后增加修复版本号，如 2.0.0-1、2.0.0-2
 *
 * 注意：
 * 1. 如果在 develop 执行 release.js，则会自动同步发版 SYNC_RELEASE_BRANCHES 中的分支
 * 2. 如果在其他分支中执行 release.js，则只会在当前分支发版（遵循 git work flow 的 hot-fix 工作法）
 * 3. 可以在通过命令行参数指定要发版的分支(分支名称用英文逗号间隔)，如: npm run release --syncbranch develop,master
 */

// 在 develop 分支执行发版操作时，同步发版的分支
const SYNC_RELEASE_BRANCHES = [
  "test",
  // "master"
];

/* eslint-disable @typescript-eslint/no-var-requires */
const args = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const semver = require("semver");
const currentVersion = require("../package.json").version;
const { prompt } = require("enquirer");
const execa = require("execa");

const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]);
const isDryRun = args.dry;

const versionIncrements = ["repair", "patch", "minor", "major"];

const inc = (i) => {
  if (i == "repair") {
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

// 验证需要同步的分支是否存在于远程仓库中
const getSyncBranches = () => {
  if (!args.syncbranch) return SYNC_RELEASE_BRANCHES;
  const inputBranch = args.syncbranch.split(",");
  const allRemoteBranch = execa.commandSync("git branch -r").stdout;
  inputBranch.forEach((branch) => {
    if (!allRemoteBranch.includes(branch)) {
      throw new Error(`远程仓库中没有此分支: ${branch}`);
    }
  });
  return inputBranch;
};
const syncBranch = getSyncBranches();

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

  step("publish all packages...");
  await run("pnpm", ["run", "publish"]);

  // // build all packages with types
  // step("\nBuilding all packages...");
  // if (!skipBuild && !isDryRun) {
  //   await run("pnpm", ["run", "build"]);
  //   // test generated dts files
  // } else {
  //   console.log("(skipped)");
  // }

  // generate changelog
  step("\nGenerating changelog...");
  await run("pnpm", ["run", "changelog"]);

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

    // 如果当前是 develop 分支，则同步发版到 SYNC_RELEASE_BRANCHES 中所有分支
    if (getCurrentBranch() == "develop") {
      for (const branch of syncBranch) {
        step(`\n[Branch ${branch}] Pushing to GitLab...`);
        runIfNotDry("git", ["push", branch, `refs/tags/v${targetVersion}`]);
        await runIfNotDry("git", ["checkout", branch]);
        await runIfNotDry("git", ["merge", "develop"]);
        await runIfNotDry("git", ["push"]);
      }
      await runIfNotDry("git", ["checkout", "develop"]);
    }
  };

  await syncPushCode();

  if (isDryRun) {
    console.log("\nDry run finished - run git diff to see package changes.");
  }

  console.log();
}

function updateVersions(version) {
  updatePackage(path.resolve(__dirname, "../"), version);
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.version = version;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

main().catch((err) => {
  updateVersions(currentVersion);
  console.error(err);
});
