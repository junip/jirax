/**
 * Authentication Module 
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * return the jiraAuth BASE object and then we can call the apis 
 * on the base of the main object.
 * 
*/
// your API Token = WwUjxh5TM2QkGovimPrc2FDB; 

var jiraConnector = require('jira-connector')
var encodeString = require('./Encoding')

module.exports = Authentication

/**
 * Config Object contains the username and API token
 * @param {*} config 
 */
function Authentication(config){
    var HOST_NAME = config.host_name ? config.host_name : "promobi.atlassian.net"
    var encode = new encodeString(config)
    var encodedString64 = encode.encodedString();
    
    this.authenticate = function() {
        var JIRA_AUTH = new jiraConnector({
            host: HOST_NAME,
            basic_auth: {
                base64: encodedString64
            }
        });

        return JIRA_AUTH;
    }
}