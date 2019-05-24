/**
 * After taking input from user parse the data and validate
 * save input to configstore
 */

var Configstore = require('configstore');
var jiraAuth = require('./Authentication');
var consoleApi = require('../api/Console')
const print = new consoleApi();
const chalk = require('chalk');



module.exports = function() {
    /**
     * Verify the user and save the object
     * @config object
    */
    this.verifyAndSave = function(config) {
        // authenticate and save the inputs in config store
        let jira = new jiraAuth();
        jira.authenticate(config, function(data){

            
            if(data.error) {
                print.printError("Authorized");
            } else {
                let message = data.success.displayName.split(' ')[0]
                print.printYellow('Hi' + message);
                // saving the data
                let hostname = data.hostname;
                let encodedString = data.encodedString;
                let configStore = new Configstore('jiraconfig');

                configStore.set({hostname: hostname})
                configStore.set({encodedString: encodedString});
                console.log(chalk.green.bold('Logged in Successfully'))
            }
        })
    }
}