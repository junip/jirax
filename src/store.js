/**
 * After taking input from user parse the data and validate
 * save input to configstore , remove the saved credentials
 * when user opted to remove the credentials
 */

const Configstore = require("configstore");
// apis
const jira = require("./authentication");
const print = require("./utility/console");
const question = require("./api/questions");
const util = require("./utility/utils");

const configStore = new Configstore("jiraconfig");
const spinner = util.spinner("Authenticating...");
/**
 * Verify the user and save the object
 * @config object
 */
module.exports = {
  signUpUser: () => {
    const isLoggedIn = configStore.get("apiToken");
    if (!isLoggedIn) {
      question.askCredential().then((answers) => {
        spinner.start();
        module.exports.verifyAndSave(answers);
      });
    } else {
      print.printInfo("You are already logged in");
    }
  },

  verifyAndSave: (config) => {
    // authenticate and save the inputs in config store
    jira.authenticate(config, (data) => {
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
  storeInfo: (data) => {
    const message = data.user.displayName.split(" ")[0];
    print.printFigletYellow(`Hi ${message}`);
    // saving the data
    const { hostname, user, apiToken, url } = data;
    const { accountId, timeZone, displayName, emailAddress } = user;

    configStore.set({
      hostname,
      timeZone,
      accountId,
      displayName,
      apiToken,
      url,
      emailAddress,
    });
    print.printInfo("You have Logged in Successfully  🍺🎉🎊🚀");
  },

  /**
   * @warning
   * This method will remove the login credentials from System which is used to
   * authenticate with JIRA apis
   * Use Case -
   * After the revoking the API key you may need to re-loggin with new JIRAX
   * then you need to remove the STORED Credentials
   *
   */
  removeCredentials: () => {
    question.confirmRemoval().then((answers) => {
      if (answers.remove === "Yes") {
        configStore.clear();
        print.printInfo("You Have Successfully removed the login credentials.");
        print.printInfo("Use `jirax --login` command for login");
      }
    });
  },
};
