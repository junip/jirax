/**
 * Question Prompt Module
 */

const inquirer = require('inquirer');
const issue = require('./issue_client');

const credentialQuestion = [
  {
    type: 'input',
    name: 'host_name',
    message: 'Your JIRA Host Name (eg: something.atlassian.net)',
    validate: (value) => (value.length ? true : 'Please enter Host Name'),
  },
  {
    type: 'input',
    name: 'user_name',
    message: 'Your JIRA User Name',
    validate: (value) => (value.length ? true : 'Please enter Jira User Name'),
  },
  {
    type: 'password',
    name: 'api_token',
    message: 'Your API Token',
    mask: '*',
    validate: (value) => (value.length ? true : 'Please Enter Your API Token')
  },
];

module.exports = {
  // asking credential for the input from user
  askCredential: () => inquirer.prompt(credentialQuestion),
  // ask issue transitions prompt is shown with available transitions
  askIssueTranstions: (issueKey, cb) => {
    issue.getStoredTranstions(issueKey, (data) => {
      if (typeof data === 'string') {
        cb(data);
      } else {
        cb(
          inquirer.prompt([
            {
              type: 'list',
              name: 'transtion',
              message: 'Please select the transtion type',
              choices: data,
            },
          ]),
        );
      }
    });
  },
  // Confirmation prompt for the JIRA login cred removal from configStore
  confirmRemoval: () => inquirer.prompt([
    {
      type: 'list',
      name: 'remove',
      message:
        'Are you sure? This command will remove the login credentials from system. ' +
        'You need to login again for further usages of JIRAX',
      choices: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }]
    },
  ]),
};
