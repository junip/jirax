#!/usr/bin/env node

const program = require("commander");
const input = require("./store");
const issue = require("./api/issue_client");
const project = require("./api/project_client");
const tablularPrint = require("./api/print_details");
const jql = require("./api/jql_client")

program.version("1.0.0").description("CLI Tool for accessing JIRA");

program
  .option("-l, login", "Login Using JIRA API Token")
  .option("-r, open-board <key>", "Open Rapid Board for the Given Project Key")
  .option("open <key>", "Open Issue Using KEYS for Given Key")
  .option("details <key>", "Prints Issue Details for Given Key")
  .option("list", "List of To Do issues for the current User")
  .option("completed", "List of completed issues")
  .option("inreview", "List of issues which are in review")
  .option("comments <key>", "Get all the comments for the issue")
  .option("add-comment <key> <comment>", "Add Comment to the Given Issues")
  .option("delete-comment <key> <comment-id>", "delete the comment for specific issuekey")
  .option("assign <key> <assignee>", "Assign issue to another user");

program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}

if (program.login) {
  input.signUpUser();
}

if (program.details) {
  tablularPrint.printIssueDetails({ issueKey: program.details });
}

if (program.open) {
  issue.openIssue(program.open);
}
if (program.openBoard) {
  project.openRapidBoard(program.openBoard);
}
if (program.list) {
  jql.fetchMyOpenIssues();
}
if (program.completed) {
  jql.fetchMyCompletedIssues();
}
if (program.inreview) {
  jql.fetchMyInReviewIssues();
}
if (program.addComment) {
  issue.addComment({
    issueKey: program.addComment,
    comment: program.args.join(" ")
  });
}
if (program.comments) {
  issue.getComments(program.comments);
}

if(program.deleteComment) {
  options = { 
    issueKey: program.deleteComment,
    commentId: program.args[0]
  }
  issue.deleteComment(options)
}

if (program.assign) {
  issue.assignIssue({
    issueKey: program.assign,
    assignee: program.args.join(" ")
  });
}
