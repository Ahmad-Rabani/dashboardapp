const { execSync } = require("child_process");

const PORTS = [3000, 3001];

function getPidsOnPortWindows(port) {
  const pids = new Set();
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });

    for (const line of output.split(/\r?\n/)) {
      if (!/LISTENING/i.test(line)) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
  } catch {
    // nothing listening
  }
  return pids;
}

function freePortWindows(port) {
  const pids = getPidsOnPortWindows(port);
  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      console.log(`Stopped process ${pid} on port ${port}`);
    } catch {
      // already exited
    }
  }
}

function freePortUnix(port) {
  try {
    const pid = execSync(`lsof -ti tcp:${port}`, { encoding: "utf8" }).trim();
    if (pid) {
      execSync(`kill -9 ${pid}`, { stdio: "ignore" });
      console.log(`Stopped process ${pid} on port ${port}`);
    }
  } catch {
    // nothing listening
  }
}

const freePort = process.platform === "win32" ? freePortWindows : freePortUnix;

console.log("Freeing dev server ports...");
for (const port of PORTS) {
  freePort(port);
}
console.log("Done. You can run npm run dev again.");
