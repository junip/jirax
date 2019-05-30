#!/usr/bin/env node

const program = require("commander");
const input = require("./SaveInput");
const issue = require("./api/IssueClient");
const project = require("./api/ProjectClient");
const tablularPrint = require("./api/PrintDetails");

program.version("1.0.0").description("Cli tool for JIRA");

program
  .option("-l, --login", "Login Using JIRA API Token")
  .option("-issue, --open-issue <key>", "Open Issue Using KEYS for Given Key")
  .option("-detail, --issue-detail <key>", "Prints Issue Details for Given Key")
  .option(
    "-rapid, --open-board <key>",
    "Open Rapid Board for the Given Project Key"
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
if (program.openBoard) {
  project.openRapidBoard(program.openBoard);
}
