import * as fs from "fs";
import path from "path";
import csv from "csvtojson";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, "csv/data.csv");
const output = path.join(__dirname, "csv/data.txt");

const readableStream = fs.createReadStream(file);
const writableStream = fs.createWriteStream(output);

readableStream
  .pipe(csv())
  .on("data", (data) => {
    const jsonData = data.toString("utf8");
    console.log("json Data", jsonData);
    writableStream.write(JSON.stringify(jsonData) + "\n", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      }
    });
  })
  .on("error", (err) => {
    console.error("Error reading file:", err);
  });

writableStream.on("finish", () => {
  console.log("Data written to file successfully.");
});
