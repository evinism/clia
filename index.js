const yaml = require("js-yaml");
const fs = require("fs");
const childProcess = require("child_process");

const commands = yaml.load(fs.readFileSync("./clia.yaml", "utf8"));

const args = process.argv.slice(1);
let command = commands["commands"];

while (typeof command === "object") {
    const next = args.unshift();
    if (args[next] === undefined) {
        throw new Error("Invalid subcommand " + next);
    }
}

const fqc = `${command} ${args.join(" ")}`
console.log("fqc: " + fqc)

childProcess.exec(fqc);

