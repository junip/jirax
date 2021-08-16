/**
 * Authentication Module
 * -------------------------------------------------------------
 * return the jiraAuth BASE object and then we can call the apis
 * on the base of the main object.
 */

const jiraConnector = require('jira-connector');
const Configstore = require('configstore');
const encode = require('./encode');
const util = require('./utility/utils');

const configStore = new Configstore('jiraconfig');
const { Version2Client } = require('jira.js');

// const jiraConfig = {
//   host: 'technine.atlassian.net',
//   telemetry: false, // Telemetry will not be collected
//   authentication: {
//     basic: {
//       email: 'junip.dewan@tech9.com',
//       apiToken: 'r3o2a02m1w0tafinlPny5F3B',
//     },
//   },
// };

// const client = new Version2Client({
//   host: 'https://technine.atlassian.net',
//   // Telemetry will not be collected
//   authentication: {
//     basic: {
//       email: 'junip.dewan@tech9.com',
//       apiToken: 'r3o2a02m1w0tafinlPny5F3B',
//     },
//   },
// })

// async function main() {
//   const projects = await client.userSearch.findAssignableUsers()
//   console.log(projects);
// }

// main()

module.exports = {
  /**
   * Config Object contains the username, hostname and API token
   * @param {*} config
   */
  authenticate(config, callback) {
    const HOST_NAME = config.host_name;
    const encodedString64 = encode.encodeToBase64(config);

    // JIRA BASE OBJECT
    const JIRA_AUTH = new jiraConnector({
      host: HOST_NAME,
      basic_auth: {
        base64: encodedString64,
      },
    });

    JIRA_AUTH.myself.getMyself({}, (error, success) => {
      if (success) {
        return callback({
          success,
          hostname: HOST_NAME,
          encodedString: encodedString64,
        });
      }
      return callback({ error: 'UnAuthorized' });
    });
  },
  /**
   * Returns the recently authenticated user JIRA-Connector Object
   */
  currentUser() {
    const HOST_NAME = util.getHostName();
    const encodedString64 = util.getEncodedString();

    if (!HOST_NAME) {
      console.log('Please login using your API Token');
    } else {
      const JIRA_AUTH = new jiraConnector({
        host: HOST_NAME,
        basic_auth: {
          base64: encodedString64,
        },
      });

      return JIRA_AUTH;
    }
  },
};
