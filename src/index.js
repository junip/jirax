#!/usr/bin/env node

const program = require("commander");
const input = require("./store");

const { loadBoardCommands } = require("./commands/boards");

program.version("1.0.0").description("CLI Tool for accessing JIRA");
program.option("-l, --login", "Login Using JIRA API Token");
program.option("-c, --clear", "Clear your login credentials");
program.parse();

// Add other sub commands here
loadBoardCommands();

// process optional commands here
let currentCommand = Object.keys(program.opts())[0];
switch (currentCommand) {
  case "login":
    input.signUpUser();
    break;
  case "-l":
    input.signUpUser();
    break;
  case "clear":
    input.removeCredentials();
    break;
  default:
    break;
}
