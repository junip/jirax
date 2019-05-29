/**
 * Taking User Input using with Question Prompt
 */
const inquirer = require("inquirer");
const credentialQuestion = [
  {
    type: "input",
    name: "host_name",
    message: "Host Name to use JIRA API",
    validate: function(value) {
      return value.length ? true : "Please Enter Host Name";
    }
  },
  {
    type: "input",
    name: "user_name",
    message: "Your Jira User Name",
    validate: function(value) {
      return value.length ? true : "Please Enter Your JIRA API's";
    }
  },
  {
    type: "password",
    name: "api_token",
    message: "YOUR API TOKEN",
    mask: "*",
    validate: function(value) {
      return value.length ? true : "Please Enter Your JIRA API TOKEN";
    }
  }
];

module.exports = {
  // asking credential for the input from user
  askCredential: function() {
    return inquirer.prompt(credentialQuestion);
  }
};
