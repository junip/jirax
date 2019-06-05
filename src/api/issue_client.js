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
      consoleApi.printInfo("No issues found");
    }
  },
  /** Add comment to the issue
   * { issueKey: 'SFMAC-19', comment: 'some comment'"}
   * @param {*} options
   */
  addComment: function(options) {
    let spinner = util.spinner("Posting your comment. Please wait");
    spinner.start();
    authenticate
      .currentUser()
      .issue.addComment(options, function(error, response) {
        if (response) {
          spinner.stop();
          consoleApi.printInfo("Comment added successfully");
        }
        if (error) {
          spinner.stop();
          consoleApi.printError("No issue with mentioned key found");
        }
      });
  },

  getComments: function(issueKey) {
    let spinner = util.spinner({
      text: "Fetching data...",
      spinner: "earth"
    });
    spinner.start();
    authenticate
      .currentUser()
      .issue.getComments({ issueKey: issueKey }, function(error, response) {
        if (response) {
          spinner.stop();
          if (response.comments.length === 0) {
            consoleApi.printInfo("No Comments Found");
          } else {
            response.comments.map(comment => {
              console.log(
                `${comment.id} ${consoleApi.chalkGreen(
                  comment.author.displayName.split(" ")[0]
                )} ${comment.body} \n`
              );
            });
          }
        }
      });
  },

  fetchMyOpenIssues: function() {
    jqlClient.myOpenIssues({}, function(response) {
      module.exports.printIssues(response);
    });
  },

  fetchMyInReviewIssues: function() {
    jqlClient.myInReviewIssues({}, function(response) {
      module.exports.printIssues(response);
    });
  },

  fetchMyCompletedIssues: function() {
    jqlClient.myCompletedIssues({}, function(response) {
      module.exports.printIssues(response);
    });
  },

  assignIssue: function(options) {
    let spinner = util.spinner(`Assigning the issue to ${options.assignee}`);
    spinner.start();
    authenticate
      .currentUser().issue.assignIssue(options,function(error, success){
        if(success || error) {
          spinner.stop()
        }
        if(error) {
          consoleApi.printError(error.errors.assignee)
        }
        if(success) {
          consoleApi.printInfo(success)
        }
      })
  }

};
