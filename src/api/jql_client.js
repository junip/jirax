/**
 * JIRA Apis response with jira JQL custom quesry search
 */
const authenticate = require("../authentication");
const searchIssue = authenticate.currentUser().search;

const todoJQL = "assignee = currentUser() AND status='To Do'";
const finishedJQL = "assignee = currentUser() AND status='Done'";
const inProgressJQL = "assignee = currentUser() AND status='In Progress'";

module.exports = {
  formatIssuesData(response) {
    let issues = response.issues.map(issue => {
      return {
        key: issue.key,
        summary: issue.fields.summary,
        type: issue.fields.issuetype.name
      };
    });

    return issues;
  },
  /**
   *
   * @param {*} param0
   * @param {*} callback
   * @return CurrentUser ToDo Issues
   */
  myOpenIssues: function({}, callback) {
    searchIssue.search({ jql: todoJQL }, function(error, response) {
      return callback(module.exports.formatIssuesData(response));
    });
  }
};
