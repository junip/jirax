/**
 * Login Prompt of taking inputs for user's
 * UserName
 * HostName
 * API Token
 */

const inquirer = require('inquirer')
/**
 * value is users input with respective to the question 
 * 
 * @param {*} value 
 * validates user inputs
 */
const checkIfEmpty = (value) => {
    // check if the value is empty for the given input
    if(value === "") {
        return "Please enter mentioned input"
    } else {
        return true;
    }

}
////////////////
// Questions for Taking user Inputs

inquirer
  .prompt([
    {
        type: 'input',
        name: 'host_name',
        message: 'Host Name to use JIRA API',
        validate: checkIfEmpty
    },
    {
      type: 'input',
      name: 'user_name',
      message: 'Your Jira User Name',
      validate: checkIfEmpty
    },
    {
        type: 'password',
        name: 'api_token',
        message: 'YOUR API TOKEN',
        mask: '*',
        validate: checkIfEmpty
    },

  ])
  .then(answers => {
    // check for the authentication
    // if authorize then write to fs
    // else render output to the console
    console.log(JSON.stringify(answers, null, '  '));
  });