/**
 * Used to connect JIRA issue APIS
 */
const authenticate = require("../authentication");
const open = require("open");
const util = require("../utils");
const consoleApi = require("../api/console");
const jqlClient = require("./jql_client");

module.exports = {
  /**
   * @param issueKey = {}
   * Note that this object must contain EITHER an issueId or issueKey
   * issueKey - 'TEST-12' or issueId
   */
  getIssue: function(issueKey, callback) {
    authenticate
      .currentUser()
      .issue.getIssue(issueKey, function(error, success) {
        let data = success ? success : error;
        return callback(data);
      });
  },
  /**
   * Opens the issue in the default browser
   * hostname/browse/issuekey
   * @issueKey
   */
  openIssue: function(issueKey) {
    let hostName = util.getHostName();
    let URL = `https://${hostName}/browse/${issueKey}`;
    open(URL);
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
      consoleApi.printInfo("No issues found")
    }
  },

  fetchMyOpenIssues: function() {
    jqlClient.myOpenIssues({}, function(response) {
      module.exports.printIssues(response)
    });
  },

  fetchMyInReviewIssues: function() {
    jqlClient.myInReviewIssues({}, function(response) {
      module.exports.printIssues(response)
    });
  },

  fetchMyCompletedIssues: function() {
    jqlClient.myCompletedIssues({}, function(response) {
      module.exports.printIssues(response);
    });
  }
};
