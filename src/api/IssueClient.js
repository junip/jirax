/**
 * Used to connect JIRA issue APIS
 */
const authenticate = require("../Authentication");
const open = require("open");
const Configstore = require("configstore");
const jiraconfig = new Configstore("jiraconfig");

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
    let hostName = jiraconfig.get("hostname");
    let URL = `https://${hostName}/browse/${issueKey}`;
    open(URL);
  }
};
