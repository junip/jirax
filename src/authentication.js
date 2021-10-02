/**
 * Authentication Module
 * -------------------------------------------------------------
 * return the jiraAuth BASE object and then we can call the apis
 * on the base of the main object.
 */
const Configstore = require('configstore');
const configStore = new Configstore('jiraconfig');
const { Version2Client } = require('jira.js');
const jiraConnector = require('jira-connector');
const emailAddress = configStore.get('emailAddress');
const apiToken = configStore.get('apiToken');
const hostname = configStore.get('hostname');

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
                    apiToken: config.api_token
                }
            }
        });

        client.myself
            .getCurrentUser()
            .then(user => {
                if (user) {
                    return callback({
                        user,
                        url: `https://${config.host_name}`,
                        hostname: HOST_NAME,
                        apiToken: config.api_token
                    });
                }
            })
            .catch(err => {
                return callback({ error: 'UnAuthorized' });
            });
    },

    /**
     * Returns the recently authenticated user JIRA-Connector Object
     * JIRA.js
     */
    jira() {
        const emailAddress = configStore.get('emailAddress');
        const apiToken = configStore.get('apiToken');
        const hostUrl = configStore.get('url');
        if (!apiToken) {
            console.log('Please login using your API Token');
        } else {
            const JIRA_CONFIG = new Version2Client({
                host: hostUrl,
                authentication: {
                    basic: {
                        email: emailAddress,
                        apiToken: apiToken
                    }
                }
            });
            return JIRA_CONFIG;
        }
    },

    /**
     * Returns the recently authenticated jira Object
     * JIRA -CONNECTOR
     */
    jiraConnector() {
        if (!apiToken) {
            console.log('Please login using your API Token');
        } else {
            const jira = new jiraConnector({
                host: hostname,
                basic_auth: {
                    email: emailAddress,
                    api_token: apiToken
                }
            });
            return jira;
        }
    }
};
