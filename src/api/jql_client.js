/**
 * JIRA Apis response with jira JQL custom quesry search
 */
const authenticate = require("../authentication");
const util = require("../utils");
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
   *
   * @param {*} param0
   * @param {*} callback
   * @return CurrentUser ToDo Issues
   */
  myOpenIssues: function({}, callback) {
    spinner.start();
    authenticate
      .currentUser()
      .search.search({ jql: todoJQL }, function(error, response) {
        return callback(module.exports.formatIssuesData(response));
      });
  },
  /**
   * @return current user issues which are in review
   * @param {*} param0
   * @param {*} callback
   */
  myInReviewIssues: function({}, callback) {
    spinner.start();
    authenticate
      .currentUser()
      .search.search({ jql: inReviewJQL }, function(error, response) {
        return callback(module.exports.formatIssuesData(response));
      });
  },
  /**
   * @return Current User completed issues list
   * @param {*} param0
   * @param {*} callback
   */
  myCompletedIssues: function({}, callback) {
    spinner.start();
    authenticate
      .currentUser()
      .search.search({ jql: completedJQL }, function(error, response) {
        return callback(module.exports.formatIssuesData(response));
      });
  }
};
