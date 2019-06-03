/**
 * Authentication Module
 * -------------------------------------------------------------
 * return the jiraAuth BASE object and then we can call the apis
 * on the base of the main object.
 */
// your API Token = WwUjxh5TM2QkGovimPrc2FDB;

const jiraConnector = require("jira-connector");
const encode = require("./encode");
const util = require("./utils");

module.exports = {
  /**
   * Config Object contains the username, hostname and API token
   * @param {*} config
   */
  authenticate: function(config, callback) {
    let HOST_NAME = config.host_name
      ? config.host_name
      : "promobi.atlassian.net";
    let encodedString64 = encode.encodeToBase64(config);

    // JIRA BASE OBJECT
    const JIRA_AUTH = new jiraConnector({
      host: HOST_NAME,
      basic_auth: {
        base64: encodedString64
      }
    });

    JIRA_AUTH.myself.getMyself({}, function(error, success) {
      if (success) {
        return callback({
          success: success,
          hostname: HOST_NAME,
          encodedString: encodedString64
        });
      } else {
        return callback({ error: "UnAuthorized" });
      }
    });
  },
  /**
   * Returns the recently authenticated user JIRA-Connector Object
   */
  currentUser: function() {
    let HOST_NAME = util.getHostName();
    let encodedString64 = util.getEncodedString();

    if (!HOST_NAME) {
      console.log("Please Loggin using your API Token");
      console.log("Use command jirax-cli --login");
    } else {
      var JIRA_AUTH = new jiraConnector({
        host: HOST_NAME,
        basic_auth: {
          base64: encodedString64
        }
      });

      return JIRA_AUTH;
    }
  }
};
