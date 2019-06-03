/**
 * Taking User Input using with Question Prompt
 */
const inquirer = require("inquirer");
const credentialQuestion = [
  {
    type: "input",
    name: "host_name",
    message: "Host name to use JIRA (for eg: something.atlassian.com)",
    validate: function(value) {
      return value.length ? true : "Please enter Host Name";
    }
  },
  {
    type: "input",
    name: "user_name",
    message: "Your Jira User Name",
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
  }
};
