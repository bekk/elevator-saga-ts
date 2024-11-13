import * as fs from "fs";
import * as path from "path";
import clipboard from "clipboardy";

const fileContent = fs.readFileSync(
    path.join(import.meta.dirname, "./solution.js"),
    "utf8"
);
const match = fileContent.match(/solution\s*=\s*({[\s\S]*?});/);
if (match) {
    const solution = match[1];
    clipboard.writeSync(solution);
    console.log("Copied to clipboard! 📋");
} else {
    console.error("Something went wrong! 😢");
}
