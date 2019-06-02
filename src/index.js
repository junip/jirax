#!/usr/bin/env node

const program = require("commander");
const input = require("./store");
const issue = require("./api/issue_client");
const project = require("./api/project_client");
const tablularPrint = require("./api/print_details");

program.version("1.0.0").description("CLI Tool for accessing JIRA");

program
  .option("-l, --login", "Login Using JIRA API Token")
  .option("--open-issue <key>", "Open Issue Using KEYS for Given Key")
  .option("--issue-detail <key>", "Prints Issue Details for Given Key")
  .option(
    "-r, --open-board <key>",
    "Open Rapid Board for the Given Project Key"
  )
  .option("--list", "List of To Do issues for the current User");

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
if (program.list) {
  issue.fetchMyOpenIssues();
}
