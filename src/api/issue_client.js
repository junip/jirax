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
  
  assignIssue: function(options) {
    let spinner = util.spinner(`Assigning the issue to ${options.assignee}`);
    spinner.start();
    authenticate
      .currentUser()
      .issue.assignIssue(options, function(error, success) {
        if (success || error) {
          spinner.stop();
        }
        if (error) {
          consoleApi.printError("Issue Cannnot be assigned");
        }
        if (success) {
          consoleApi.printInfo(success);
        }
      });
  },

  //------------------------------COMMENTS RELATED FUNCTIONS------------------>
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
  /**
   * Get all the comments for the specific issue
   * @param {*} issueKey
   */
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

  /*
   * Delete the comment for the given issueKey
   * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
   * @param {string} opts.commentId The id of the comment.
   * @param {*} opts
   */
  deleteComment: function(opts) {
    let spinner = util.spinner('Deleting comment .....')
    spinner.start();
    authenticate
      .currentUser()
      .issue.deleteComment(opts, function(error, response) {
        if (error) {
          spinner.stop();
          consoleApi.printError("Error while deleting the comment");
        }
        if (response) {
          spinner.stop();
          consoleApi.printInfo("Comment deleted");
        }
      });
  }
};
