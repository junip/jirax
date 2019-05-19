/**
 *  After Authentication DISPLAY the USER NAME and WELCOME MESSAGE
 *  ==============================================================
 */
var jiraAuth = require('./Authentication');
var jira = new jiraAuth({});
var consoleApi = require('../api/Console');

function read() {
    jira.authenticate().myself.getMyself({},function(error, success){
        if(error) {
           console.log("Un Authorized")
        } else {
            let message = 'Hi' + success.displayName.split(' ')[0]
            consoleApi = new consoleApi(message)
            consoleApi.printYellow()
        }
    })
}

read();

