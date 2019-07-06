#!/usr/bin/env node

const program = require("commander");
const input = require("./store");
const issue = require("./api/issue_client");
const project = require("./api/project_client");
const tablularPrint = require("./api/print_details");
const jql = require("./api/jql_client");
const question = require("./api/questions");
const util = require("./utils");
const print = require("./api/console");
const store = require("./store");
const assign = require("./assign_issue");

program.version("1.0.0").description("CLI Tool for accessing JIRA");

program
  .option("-l, login", "Login Using JIRA API Token")
  .option("-r, open-board <key>", "Open Rapid Board for the Given Project Key")
  .option("open <key>", "Open specific issue for the given issuekey")
  .option("issues <key>", "Opens all the issue list for the given project key")
  .option("details <key>", "Prints Issue Details for Given Key")
  .option("move <key>", "Move issue from one status to another")
  .option("list [projectkey]", "To Do issues for ProjectKey (optional)")
  .option(
    "completed [projectkey]",
    "Completed issues for ProjectKey (optional)"
  )
  .option("inreview [projectkey]", "In Review Issues for ProjectKey (optional)")
  .option("comments <key>", "Get all the comments for the issue")
  .option("add-comment <key> <comment>", "Add Comment to the Given Issues")
  .option(
    "delete-comment <key> <comment-id>",
    "delete the comment for specific issuekey"
  )
  .option("assign-me <key>", "Assign issue to self (i.e logged in user) ")
  .option("assign <key>", "Assign issue to another user")
  .option(
    "clear",
    "Remove the stored credentials from the System (i.e API keys etc)"
  );
program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
} else {
  let encodedString = util.getEncodedString();
  if (!encodedString && !program.login) {
    return console.log(
      "Please login using command  " + print.chalkGreen("jirax login")
    );
  }

  // getting the current executed command
  let currentCommand = program.rawArgs[2];

  switch (currentCommand) {
    case "login":
      input.signUpUser();
      break;

    case "-l":
      input.signUpUser();
      break;

    case "open-board":
      project.openRapidBoard(program.openBoard);
      break;

    case "-r":
      project.openRapidBoard(program.openBoard);
      break;

    case "open":
      issue.openIssue(program.open);
      break;
    case "issues":
      issue.openProjectIssues(program.issues);
      break;

    case "details":
      tablularPrint.printIssueDetails({ issueKey: program.details });
      break;

    case "move":
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
      break;

    case "list":
      jql.fetchMyOpenIssues(program.list);
      break;
    case "completed":
      jql.fetchMyCompletedIssues(program.completed);
      break;

    case "inreview":
      jql.fetchMyInReviewIssues(program.inreview);
      break;

    case "comments":
      issue.getComments(program.comments);
      break;

    case "add-comment":
      issue.addComment({
        issueKey: program.addComment,
        comment: program.args.join(" ")
      });
      break;

    case "delete-comment":
      options = {
        issueKey: program.deleteComment,
        commentId: program.args[0]
      };
      issue.deleteComment(options);
      break;

    case "assign":
      assign.searchUser(program.assign);
      break;

    case "assign-me":
      issue.assignSelf(program.assignMe);
      break;
    case "clear":
      store.removeCredentials();
      break;
    default:
      print.printError("Unknown Command");
      program.help();
  }
}
