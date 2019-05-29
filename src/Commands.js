#!/usr/bin/env node
/**
 * After adiing this link add few changes in package.json file
 * "preferGlobal": true,
  "bin": "./src/Commands.js",
   bin prefers to the current file name from directly we can initiate the command
 */

/**
 * All Cli commands goes here
 * `https://github.com/tj/commander.js/`
 *  CLI argument processing tool
 */

const program = require("commander");
const input = require("./SaveInput");
const issue = require("./api/IssueClient");
const tablularPrint = require("./api/PrintDetails");

// jira-cli --verrsion
program.version("1.0.0").description("Cli tool for JIRA");

// jira-cli login
program
  .option("-l, --login", "Login Using JIRA API Token")
  .option("-open, --open-issue <key>", "Open Issue Using KEYS for Given Key")
  .option(
    "-detail, --issue-detail <key>",
    "Prints Issue Details for Given Key"
  );

program.parse(process.argv);

if (program.login) {
  input.signUpUser();
}
if (program.issueDetail) {
  tablularPrint.printIssueDetails({ issueKey: program.issueDetail });
}
if (program.openIssue) {
  issue.openIssue(program.openIssue);
}
