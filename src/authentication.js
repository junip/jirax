/**
 * Authentication Module
 * -------------------------------------------------------------
 * return the jiraAuth BASE object and then we can call the apis
 * on the base of the main object.
 */

const Configstore = require("configstore");
const configStore = new Configstore("jiraconfig");
const { Version2Client } = require("jira.js");

module.exports = {
  /**
   * Config Object contains the username, hostname and API token
   * @param {*} config
   */
  authenticate(config, callback) {
    const HOST_NAME = config.host_name;
    let client = new Version2Client({
      host: `https://${config.host_name}`,
      authentication: {
        basic: {
          email: config.user_name,
          apiToken: config.api_token,
        },
      },
    });

    client.myself
      .getCurrentUser()
      .then((user) => {
        if (user) {
          return callback({
            user,
            url: `https://${config.host_name}`,
            hostname: HOST_NAME,
            apiToken: config.api_token,
          });
        }
      })
      .catch((err) => {
        return callback({ error: "UnAuthorized" });
      });
  },

  /**
   * Returns the recently authenticated user JIRA-Connector Object
   */
  jiraConfig() {
    const emailAddress = configStore.get("emailAddress");
    const apiToken = configStore.get("apiToken");
    const hostUrl = configStore.get("url");
    if (!apiToken) {
      console.log("Please login using your API Token");
    } else {
      const JIRA_CONFIG = new Version2Client({
        host: hostUrl,
        authentication: {
          basic: {
            email: emailAddress,
            apiToken: apiToken,
          },
        },
      });
      return JIRA_CONFIG;
    }
  },
};
