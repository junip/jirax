#!/usr/bin/env node

const program = require("commander");
const input = require("./store");
const issue = require("./api/issue_client");
const project = require("./api/project_client");
const tablularPrint = require("./api/print_details");
const jql = require("./api/my_issues");
const question = require("./api/questions");
const util = require("./utils");
const print = require("./api/console");
const store = require("./store");
const assign = require("./assign_issue");

program.version("1.0.0").description("CLI Tool for accessing JIRA");

/**
 * JIRAX default commands
 * usages -
 *
 * jirax -l
 * jirax login
 * jirax open <project-key>
 * jirax details <issue>
 * jirax move <issue>
 * jirax assign-me <issue>
 * jirax assign <issue>
 */
program
  .option("-l, login", "Login Using JIRA API Token")
  .option(
    "-r, open-board <project-key>",
    "Open Rapid Board for the Given Project Key"
  )
  .option("open <issue>", "Open the issue in browser")
  .option(
    "issues <project-key>",
    "Opens all the issue in browser for the given project key"
  )
  .option("details <issue>", "Prints Issue Details for Given Issue")
  .option("move <issue>", "Move issue from one status to another")
  .option("assign-me <issue>", "Assign issue to self (i.e logged in user) ")
  .option("assign <issue>", "Assign issue to another user")
  .option(
    "clear",
    "Remove the stored credentials from the System (i.e API keys etc)"
  );

if (program.login) {
  input.signUpUser();
}
if (program.openBoard) {
  project.openRapidBoard(program.openBoard);
}
if (program.open) {
  issue.openIssue(program.open);
}
if (program.issues) {
  issue.openProjectIssues(program.issues);
}
if (program.details) {
  tablularPrint.printIssueDetails({ issueKey: program.details });
}
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
if (program.assign) {
  assign.searchUser(program.assign);
}
if (program.assignMe) {
  issue.assignSelf(program.assignMe);
}
if (program.clear) {
  store.removeCredentials();
}

/**
 * JIRAX sub-commands
 *
 * List -  Listing of Open Issues
 *
 * Usages -
 *
 * jirax list --all <project-key>
 * jirax list --mine [project-key] (optional project-key)
 * jirax list --user [project-key] (optional project-key)
 */
program
  .command("list")
  .option(
    "--all <project-key>",
    "List all the Issues for the given Project Key"
  )
  .option(
    "--mine [project-key]",
    "List all the User Issues (optional projectKey)"
  )
  .action(function(options) {
    if (options.mine) {
      jql.fetchMyOpenIssues(options.mine);
    }
  });

/**
 * JIRAX sub-commands
 *
 * Inreview -  Listing of Inreviewed Issues
 *
 * Usages -
 *
 * jirax inreview --all <project-key>
 * jirax inreview --mine [project-key] (optional project-key)
 * jirax inreview --user [project-key] (optional project-key)
 */

program
  .command("inreview")
  .option("--all [project-key]", "List all the Issues (optional projectKey)")
  .option(
    "--mine [project-key]",
    "List all the User Issues (optional projectKey)"
  )
  .action(function(options) {
    if (options.mine) {
      jql.fetchMyInReviewIssues(program.mine);
    }
  });

/**
 * JIRAX sub-commands
 *
 * List -  Listing of Open Issues
 *
 * Usages -
 *
 * jirax list --all <project-key>
 * jirax list --mine [project-key] (optional project-key)
 * jirax list --user [project-key] (optional project-key)
 */
program
  .command("completed")
  .option("--all [project-key]", "List all the Issues (optional projectKey)")
  .option(
    "--mine [project-key]",
    "List all the User Issues (optional projectKey)"
  )
  .action(function(options) {
    if (options.mine) {
      jql.fetchMyInReviewIssues(program.mine);
    }
  });

/**
 * JIRAX sub-commands
 *
 * Comment -  Commenting on issues
 *
 * Usages -
 *
 * jirax comment --list <issue>
 * jirax comment --add <issue> <your-comment>
 * jirax comment --delete <issue> <comment-id>
 */
program
  .command("comment")
  .option("--list <issue>", "Get all the comments for the issue")
  .option("--add <issue> <comment>", "Add comment to the issue")
  .option("--delete <issue> <comment-id>", "delete the comment using comment-id")
  .action(function(key, options) {
    // comment list
    if (key.list) {
      issue.getComments(key.list);
    }
    if (options) {
      // add-comment
      if (options.add) {
        issue.addComment({
          issueKey: options.add,
          comment: key
        });
      }
      // delete comment
      if (options.delete) {
        let params = {
          issueKey: options.delete,
          commentId: key
        };
        issue.deleteComment(params);
      }
    }
  });


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
}
