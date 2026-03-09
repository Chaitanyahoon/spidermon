/* eslint-disable */
const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedFiles = 0;
walkDir("./app", function (filePath) {
  if (filePath.endsWith(".tsx")) {
    // We will do globals.css manually
    let content = fs.readFileSync(filePath, "utf-8");

    let newContent = content
      .replace(/#E8001C/g, "var(--theme-accent)")
      .replace(/#2563EB/g, "var(--theme-accent-alt)")
      .replace(/#0a0a14/g, "var(--theme-bg)");

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, "utf-8");
      modifiedFiles++;
    }
  }
});

console.log(`${modifiedFiles} files updated.`);
