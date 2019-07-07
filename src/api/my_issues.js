/**
 * JIRA Apis response with jira JQL custom quesry search
 */
const authenticate = require("../authentication");
const util = require("../utils");
const consoleApi = require("./console");
const spinner = util.spinner({ text: "Fetching data...", spinner: "earth" });

const todoJQL = "assignee = currentUser() AND status='To Do'";
const completedJQL = "assignee = currentUser() AND status='Done'";
const inReviewJQL = "assignee = currentUser() AND status='In Review'";

module.exports = {
  formatIssuesData(response) {
    let issues;
    if (response) {
      spinner.stop();
    }
    if (response.issues.length) {
      issues = response.issues.map(issue => {
        return {
          key: issue.key,
          summary: issue.fields.summary,
          type: issue.fields.issuetype.name
        };
      });
    }
    return issues;
  },

  /**
   * Print the issue listing in a proper format
   * @param {*} issues
   */
  printIssues: function(issues) {
    if (issues) {
      issues.map(issue => {
        console.log(
          `${issue.key} ${util.setIssueColor(issue.type)} ${issue.summary} \n`
        );
      });
    } else {
      consoleApi.printInfo("No issues found");
    }
  },
  /**
   *
   * @param {*} param0
   * @param {*} callback
   * @return CurrentUser ToDo Issues
   */
  myOpenIssues: function(projectKey, callback) {
    spinner.start();
    let JQL =
      projectKey === true ? todoJQL : todoJQL + ` AND project = ${projectKey}`;
    authenticate
      .currentUser()
      .search.search({ jql: JQL }, function(error, response) {
        return callback(module.exports.formatIssuesData(response));
      });
  },
  /**
   * @return current user issues which are in review
   * @param {*} param0
   * @param {*} callback
   */
  myInReviewIssues: function(projectKey, callback) {
    spinner.start();
    let JQL =
      projectKey === true
        ? inReviewJQL
        : inReviewJQL + `  AND project = ${projectKey}`;
    authenticate
      .currentUser()
      .search.search({ jql: JQL }, function(error, response) {
        return callback(module.exports.formatIssuesData(response));
      });
  },
  /**
   * @return Current User completed issues list
   * @param {*} param0
   * @param {*} callback
   */
  myCompletedIssues: function(projectKey, callback) {
    spinner.start();
    let JQL =
      projectKey === true
        ? completedJQL
        : completedJQL + ` AND project = ${projectKey}`;
    authenticate
      .currentUser()
      .search.search({ jql: JQL }, function(error, response) {
        return callback(module.exports.formatIssuesData(response));
      });
  },

  fetchMyOpenIssues: function(projectKey) {
    module.exports.myOpenIssues(projectKey, function(response) {
      module.exports.printIssues(response);
    });
  },

  fetchMyInReviewIssues: function(projectKey) {
    module.exports.myInReviewIssues(projectKey, function(response) {
      module.exports.printIssues(response);
    });
  },

  fetchMyCompletedIssues: function(projectKey) {
    module.exports.myCompletedIssues(projectKey, function(response) {
      module.exports.printIssues(response);
    });
  }
};
