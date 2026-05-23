const { spawn } = require("child_process");
const path = require("path");
const net = require("net");
const { execSync } = require("child_process");

const DEV_PORT = Number(process.env.PORT) || 3000;
const CLEAN_SCRIPT = path.join(__dirname, "clean-next-cache.cjs");
const STOP_SCRIPT = path.join(__dirname, "stop-dev.cjs");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPidsOnPortWindows(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });

    const pids = new Set();
    for (const line of output.split(/\r?\n/)) {
      if (!/LISTENING/i.test(line)) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
    return pids;
  } catch {
    return new Set();
  }
}

function isPortInUse(port) {
  if (process.platform === "win32") {
    return Promise.resolve(getPidsOnPortWindows(port).size > 0);
  }

  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(true));
    server.once("listening", () => {
      server.close(() => resolve(false));
    });
    server.listen(port, "0.0.0.0");
  });
}

function runNodeScript(scriptPath) {
  execSync(`node "${scriptPath}"`, { stdio: "inherit", cwd: process.cwd() });
}

async function main() {
  console.log("Preparing dev server...\n");

  // Always stop stale Next.js instances first (fixes missed port checks on Windows).
  runNodeScript(STOP_SCRIPT);
  await sleep(1000);

  if (await isPortInUse(DEV_PORT)) {
    console.error(
      `\nPort ${DEV_PORT} is still in use after dev:stop.`
    );
    console.error("Close other apps using port 3000, or run: npm run dev:stop");
    console.error("Then try: npm run dev\n");
    if (process.platform === "win32") {
      const pids = getPidsOnPortWindows(DEV_PORT);
      if (pids.size) {
        console.error(`Still listening PIDs: ${[...pids].join(", ")}\n`);
      }
    }
    process.exit(1);
  }

  console.log("Clearing Next.js cache...");
  runNodeScript(CLEAN_SCRIPT);

  console.log(`\nStarting Next.js on http://localhost:${DEV_PORT}\n`);

  const nextBin = path.join(
    process.cwd(),
    "node_modules",
    "next",
    "dist",
    "bin",
    "next"
  );

  const child = spawn(
    process.execPath,
    [nextBin, "dev", "-p", String(DEV_PORT)],
    {
      stdio: "inherit",
      cwd: process.cwd(),
      env: { ...process.env, PORT: String(DEV_PORT) },
    }
  );

  child.on("exit", (code, signal) => {
    if (signal) process.exit(1);
    process.exit(code ?? 1);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
