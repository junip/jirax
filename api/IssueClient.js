/**
 * Used to connect JIRA issue APIS
 */
var jiraAuth = require('../lib/Authentication');
var open = require('open');
var Configstore = require('configstore');

const jiraconfig = new Configstore('jiraconfig');
const currentUser = new jiraAuth().currentUser();


module.exports = IssueClient;

function IssueClient() {
    /**
     * @param issueKey = {}
     * Note that this object must contain EITHER an issueId or issueKey 
     * issueKey - 'TEST-12' or issueId 
     */
    this.getIssue = function(issueKey, callback) {
        currentUser.issue.getIssue(issueKey,function (error, success) {
            let data = success? success : error;
            return callback(data);
        });
        
    }
    /**
     * Opens the issue in the default browser
     * hostname/browse/issuekey
     * @issueKey
     */
    this.openIssue = function(issueKey) {
        let hostName = jiraconfig.get('hostname');
        let URL = `https://${hostName}/browse/${issueKey}`
        open(URL);
    }
}