#!/usr/bin/env node

const program = require("commander");
const input = require("./store");
const issue = require("./api/issue_client");
const project = require("./api/project_client");
const tablularPrint = require("./api/print_details");
const jql = require("./api/jql_client");
const question = require("./api/questions");
const print = require("./api/console");

program.version("1.0.0").description("CLI Tool for accessing JIRA");

program
  .option("-l, login", "Login Using JIRA API Token")
  .option("-r, open-board <key>", "Open Rapid Board for the Given Project Key")
  .option("open <key>", "Open specific issue for the given issuekey")
  .option("issues <key>", "Opens all the issue list for the given project key")
  .option("details <key>", "Prints Issue Details for Given Key")
  .option("move <key>", "Move issue from one status to another")
  .option("list [projectkey]", "To Do issues for ProjectKey (optional)")
  .option("completed [projectkey]", "Completed issues for ProjectKey (optional)")
  .option("inreview [projectkey]", "In Review Issues for ProjectKey (optional)")
  .option("comments <key>", "Get all the comments for the issue")
  .option("add-comment <key> <comment>", "Add Comment to the Given Issues")
  .option(
    "delete-comment <key> <comment-id>",
    "delete the comment for specific issuekey"
  )
  .option("assign-me <key>", "Assign issue to self(i.e logged in user")
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
  jql.fetchMyOpenIssues(program.list);
}
if (program.completed) {
  jql.fetchMyCompletedIssues(program.completed);
}
if (program.inreview) {
  jql.fetchMyInReviewIssues(program.inreview);
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

if (program.deleteComment) {
  options = {
    issueKey: program.deleteComment,
    commentId: program.args[0]
  };
  issue.deleteComment(options);
}

if (program.assign) {
  issue.assignIssue({
    issueKey: program.assign,
    assignee: program.args.join(" ")
  });
}
// moving issue dependency
if (program.move) {
  question.askIssueTranstions(program.move, function(data) {
    if (typeof data === "string") {
      print.printError(data);
    } else {
      data.then(answers => {
        issue.changeStatus({
          issueKey: program.move,
          transition: answers["transtion"]
        });
      });
    }
  });
}

if (program.assignMe) {
  issue.assignSelf(program.assignMe);
}

if (program.issues) {
  issue.openProjectIssues(program.issues);
}
