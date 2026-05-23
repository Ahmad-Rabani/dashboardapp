const fs = require("fs");
const path = require("path");
const os = require("os");

const RETRIES = 5;
const RETRY_DELAY_MS = 400;

const cacheDirs = [
  path.join(process.cwd(), ".next"),
  path.join(process.env.LOCALAPPDATA || os.tmpdir(), "dashboardapp-next"),
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeDir(dir) {
  if (!fs.existsSync(dir)) return true;

  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
  return !fs.existsSync(dir);
}

async function cleanWithRetries() {
  let allOk = true;

  for (const dir of cacheDirs) {
    let removed = false;

    for (let attempt = 1; attempt <= RETRIES; attempt++) {
      try {
        removed = removeDir(dir);
        if (removed) {
          console.log(`Removed ${dir}`);
          break;
        }
      } catch (error) {
        if (attempt === RETRIES) {
          console.warn(`Could not remove ${dir}: ${error.message}`);
          allOk = false;
        }
      }

      if (!removed && attempt < RETRIES) {
        await sleep(RETRY_DELAY_MS);
      }
    }

    if (!removed && fs.existsSync(dir)) {
      console.warn(
        `Still present (stop "npm run dev" first, then run "npm run dev:stop"): ${dir}`
      );
      allOk = false;
    }
  }

  return allOk;
}

cleanWithRetries().then((ok) => {
  if (!ok) process.exitCode = 1;
});
