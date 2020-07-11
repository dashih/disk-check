"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");
const execSync = require("child_process").execSync;

let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "config.json"), "utf8"));
let stateFile = config["stateFile"];
let state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
let disk = state["disk"];
let date = new Date(state["timestamp"]);
console.log(util.format("Report for disk check on %s started %s.%s.%s at %s:%s",
                        disk,
                        date.getMonth() + 1,
                        date.getDate(),
                        date.getFullYear(),
                        date.getHours(),
                        date.getMinutes()));
console.log("********************************************************************************\n");
execSync("smartctl --log=selftest " + disk, { stdio: "inherit" });
