#!/usr/bin/env node

const program = require("commander");
const input = require("./store");
const issue = require("./api/issue_client");
const project = require("./api/project_client");
const tablularPrint = require("./api/print_details");

program.version("1.0.0").description("CLI Tool for accessing JIRA");

program
  .option("-l, --login", "Login Using JIRA API Token")
  .option("--open <key>", "Open Issue Using KEYS for Given Key")
  .option("--details <key>", "Prints Issue Details for Given Key")
  .option(
    "-r, --open-board <key>",
    "Open Rapid Board for the Given Project Key"
  )
  .option("--list", "List of To Do issues for the current User")
  .option("--completed", "List of completed issues")
  .option("--inreview", "List of issues which are in review")


program.parse(process.argv);

if (program.login) {
  input.signUpUser();
}
if (program.details) {
  tablularPrint.printIssueDetails({ issueKey: program.details });
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
if (program.completed) {
  issue.fetchMyCompletedIssues();
}
if (program.inreview) {
  issue.fetchMyInReviewIssues();
}
