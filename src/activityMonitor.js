const childProcess = require("child_process");
const fs = require("fs");

const platform = process.platform;
let data;

const updateLog = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  const logMessage = `${timestamp} : ${data}\n`;

  fs.appendFile("src/activityMonitor.log", logMessage, (err) => {
    if (err) {
      console.error("Error appending to file:", err);
    }
  });
};

const activityMonitor = setInterval(() => {
  const command = platform === "win32" ? "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"" : "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";

  childProcess.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing system command:", error);
      return;
    }

    console.clear();

    process.stdout.write("\r" + stdout);
    data = stdout;
  });
}, 100);

const logInterval = setInterval(updateLog, 60000);

const clearIntervals = () => {
  clearInterval(activityMonitor);
  clearInterval(logInterval)
};

process.on("exit", clearIntervals);
