/**
 * After taking input from user parse the data and validate
 * save input to configstore
 */

const Configstore = require("configstore");
const jira = require("./Authentication");
const print = require("./api/Console");
const chalk = require("chalk");

/**
 * Verify the user and save the object
 * @config object
 */
module.exports = {
  verifyAndSave: function(config) {
    // authenticate and save the inputs in config store
    jira.authenticate(config, function(data) {
      if (data.error) {
        print.printError("Un authorized");
      } else {
        module.exports.storeInfo(data);
      }
    });
  },
  /**
   * Store user data after authentication
   * @param {*} data
   */
  storeInfo: function(data) {
    let message = data.success.displayName.split(" ")[0];
    print.printFigletYellow(`Hi ${message}`);
    // saving the data
    let hostname = data.hostname;
    let encodedString = data.encodedString;
    let configStore = new Configstore("jiraconfig");
    configStore.set({ hostname: hostname });
    configStore.set({ encodedString: encodedString });

    console.log(chalk.green.bold("You have Logged in Successfully"));
  }
};
