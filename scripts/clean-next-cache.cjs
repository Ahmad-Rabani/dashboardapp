const fs = require("fs");
const path = require("path");
const os = require("os");

const cacheDirs = [
  path.join(process.cwd(), ".next"),
  path.join(process.env.LOCALAPPDATA || os.tmpdir(), "dashboardapp-next"),
];

for (const dir of cacheDirs) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Removed ${dir}`);
  } catch (error) {
    console.warn(`Could not remove ${dir}:`, error.message);
  }
}
