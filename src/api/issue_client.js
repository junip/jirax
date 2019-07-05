/**
 * Used to connect JIRA issue APIS
 */
const authenticate = require("../authentication");
const open = require("open");
const util = require("../utils");
const consoleApi = require("../api/console");
const Configstore = require("configstore");
const configStore = new Configstore("jiraconfig");

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
   * this method opens the issues for the given project key
   *
   * @param {*} projectKey
   */
  openProjectIssues: function(projectKey) {
    let hostName = util.getHostName();
    let URL = `https://${hostName}/projects/${projectKey}/issues`;
    open(URL);
  },
  /**
   * A method return array of transtions available for the specific issues
   * @param options.issuekey isssue keys to which this
   * @param {*} options
   */
  getTranstions: function(issueKey, cb) {
    let key = issueKey.split("-")[0];
    let spinner = util.spinner({
      text: "Fetching available transtions...",
      spinner: "earth"
    });
    spinner.start();
    authenticate
      .currentUser()
      .issue.getTransitions({ issueKey: issueKey }, function(error, success) {
        let availableTranstions = [];
        if (success) {
          spinner.stop();
          success.transitions.map(t => {
            availableTranstions.push({ name: t.name, value: t.id });
          });
          configStore.set(key, availableTranstions);
          return cb(availableTranstions);
        }
        if (error) {
          spinner.stop();
          cb(error.errorMessages[0]);
        }
      });
  },
  /**
   *  This method changes the status of the issue
   *
   * @param{String} object.transtion - id to which issue transtion will happen
   * @param{String} object.issueKey - issuekey for which issue transtion happen
   * @param {*} object
   */
  changeStatus: function(object) {
    let spinner = util.spinner("Changing transtion...");
    spinner.start();
    authenticate
      .currentUser()
      .issue.transitionIssue(object, function(error, success) {
        if (success) {
          let key = object.issueKey.split("-")[0];

          let transitionName = configStore.get(key).filter(el => {
            if (el.value === object.transition) {
              return el.name;
            }
          });

          let message = `${consoleApi.chalkRed(
            object.issueKey
          )} is transitioned to ${consoleApi.chalkGreen(
            transitionName[0].name
          )}`;
          spinner.stop();
          console.log(message);
        }
        if (error) {
          spinner.stop();
          consoleApi.printError(error);
        }
      });
  },

  assignIssue: function(issueKey, accountId, username) {
    let options = {
      issueKey: issueKey,
      accountId: accountId
    };
    let spinner = util.spinner(
      `Assigning the issue ${issueKey} to ${username}`
    );
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
          let message = `Issue ${consoleApi.chalkRed(
            issueKey
          )} ${consoleApi.chalkGreen(
            "is assigned to"
          )} ${consoleApi.printbgCyan(username)}`;
          consoleApi.printInfo(message);
        }
      });
  },
  /**
   * Assign the issue to self i.e logged in user
   * @param issueKey
   * @param {*} issueKey
   */
  assignSelf: function(issueKey) {
    let accountId = configStore.get("accountId");
    let username = configStore.get("username");

    module.exports.assignIssue(issueKey, accountId, username);
  },

  /**
   * Get the issue statuses of project for the given issue
   * @param {*} issueKey
   */
  getStoredTranstions(issueKey, cb) {
    let key = issueKey.split("-")[0];
    let keyPresent = configStore.get(key);
    if (!keyPresent) {
      module.exports.getTranstions(issueKey, function(data) {
        return cb(data);
      });
    } else {
      let transitions = configStore.get(key);
      return cb(transitions);
    }
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
    let spinner = util.spinner("Deleting comment .....");
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
