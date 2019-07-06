/**
 * Question Prompt Module
 */

const issue = require("../api/issue_client");
const inquirer = require("inquirer");

const credentialQuestion = [
  {
    type: "input",
    name: "host_name",
    message: "Your JIRA Host Name (eg: something.atlassian.net)",
    validate: function(value) {
      return value.length ? true : "Please enter Host Name";
    }
  },
  {
    type: "input",
    name: "user_name",
    message: "Your JIRA User Name",
    validate: function(value) {
      return value.length ? true : "Please enter Jira User Name";
    }
  },
  {
    type: "password",
    name: "api_token",
    message: "Your API Token",
    mask: "*",
    validate: function(value) {
      return value.length ? true : "Please Enter Your API Token";
    }
  }
];

module.exports = {
  // asking credential for the input from user
  askCredential: function() {
    return inquirer.prompt(credentialQuestion);
  },

  askIssueTranstions: function(issueKey, cb) {
    issue.getStoredTranstions(issueKey, function(data) {
      if (typeof data == "string") {
        return cb(data);
      } else {
        return cb(
          inquirer.prompt([
            {
              type: "list",
              name: "transtion",
              message: "Please select the transtion type",
              choices: data
            }
          ])
        );
      }
    });
  },

  confirmRemoval: function() {
    return inquirer.prompt([
      {
        type: "list",
        name: "remove",
        message:
          "Are you sure? This command will remove the login credentials from system. " +
          "You need to login again for further usages of JIRAX",
        choices: [{ key: "Yes", value: "Yes" }, { key: "No", value: "No" }]
      }
    ]);
  }
};
