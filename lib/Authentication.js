/**
 * Authentication module to authenticate with the JIRA API's.
 * 
*/
// your API Token = WwUjxh5TM2QkGovimPrc2FDB

const jiraConnector = require('jira-connector');

const base64EncodedString = require('./Encoding') 
const HOST_NAME = "promobi.atlassian.net"

const JIRA = new jiraConnector({
    host: HOST_NAME,
    basic_auth: {
        base64: base64EncodedString
    }
});

module.exports = JIRA
