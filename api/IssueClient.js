/**
 * Used to connect JIRA issue APIS
 */
var jiraAuth = require('../lib/Authentication'); 
var jira = new jiraAuth({});
const currentUser = jira.authenticate();

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

}