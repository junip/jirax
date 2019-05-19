/**
 *  After Authentication DISPLAY the USER NAME and WELCOME MESSAGE
 *  ==============================================================
 */
var jiraAuth = require('./Authentication');
var consoleApi = require('../api/Console');

module.exports = Welcome;

/**
 * User inputs config
 * config = {
 *  host_name: "",
 *  user_name: "",
 *  api_token: ""
 * }
 * @param {*} config 
 */
function Welcome (config) {
    /**
     * Authenticate the user by priniting the first name in console
     * else print unauthorized. 
     */
    // TO DO need to pass the config in the auth
    this.user = function () {
        var jira = new jiraAuth({});
        jira.authenticate().myself.getMyself({},function(error, success){
            if(error) {
               console.log("Un Authorized")
            } else {
                consoleApi = new consoleApi(welcomeMessage(success))
                consoleApi.printYellow()
            }
        })
    }
}

/**
 * Welcome the user  
 * return the user first name
 */
function welcomeMessage(response) {
    let message = response.displayName.split(' ')[0]
    return 'Hi' + message;
}
