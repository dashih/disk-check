"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");
const execSync = require("child_process").execSync;

let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "config.json"), "utf8"));
let stateFile = config["stateFile"];
let disks = config["disks"];

let state = null;
if (fs.existsSync(stateFile)) {
    state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
    state["index"]++;
    if (state["index"] == disks.length) {
        state["index"] = 0;
    }

    state["disk"] = disks[state["index"]];
    state["timestamp"] = Date.now();
    fs.writeFileSync(stateFile, JSON.stringify(state, 4), "utf8");
} else {
    state = {
        "index" : 0,
        "disk" : disks[0],
        "timestamp" : Date.now()
    };

    fs.writeFileSync(stateFile, JSON.stringify(state, 4), "utf8");
}

let disk = state["disk"];
console.log("Scheduling check for " + disk + "...");
execSync("smartctl --test=long " + disk);
