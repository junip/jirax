/**
 * After taking input from user parse the data and validate
 * save input to configstore
 */

const Configstore = require("configstore");
const jira = require("./authentication");
const print = require("./api/console");
const chalk = require("chalk");
const question = require("./api/questions");
const configStore = new Configstore("jiraconfig");
const util = require("./utils");
const spinner = util.spinner(" Authenticating...");
/**
 * Verify the user and save the object
 * @config object
 */
module.exports = {
  signUpUser: function() {
    let isLoggedIn = configStore.get("encodedString");
    if (!isLoggedIn) {
      question.askCredential().then(answers => {
        spinner.start();
        module.exports.verifyAndSave(answers);
      });
    } else {
      print.printInfo("You are already logged in");
    }
  },

  verifyAndSave: function(config) {
    // authenticate and save the inputs in config store
    jira.authenticate(config, function(data) {
      if (data) {
        spinner.stop();
      }
      if (data.error) {
        print.printError("Unauthorized - Please re-enter your credentials");
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

    console.log(
      chalk.green.bold("You have Logged in Successfully") + "  🍺🎉🎊"
    );
  }
};
