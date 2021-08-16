/**
 * Search user autocompleted and find the user
 */

const inquirer = require('inquirer');
const autocompletePrompt = require('inquirer-autocomplete-prompt');

inquirer.registerPrompt('autocomplete', autocompletePrompt);
const fuzzy = require('fuzzy');
const user = require('./api/user');
const issue = require('./api/issue_client');

let issueKey;
let fetchedUsersArray;

module.exports = {
  /**
   * prompt user search option to assign issue
   * @param {*} issue
   */
  searchUser(issue) {
    issueKey = issue;
    inquirer
      .prompt([
        {
          type: 'autocomplete',
          name: 'name',
          message: 'Please search for the user to assign',
          source: module.exports.searchUsers,
          pageSize: 5,
        },
      ])
      .then((answers) => {
        // assign the issue to selected user
        module.exports.findAccountAndAssign(answers.name);
      });
  },

  /**
   * Returns the list of available users for the input and assignable issueKey
   * @param {*} answers
   * @param {*} input
   * @returns Name of available users
   */
  searchUsers(answers, input) {
    input = input || '';
    const names = [];
    user.searchAssignableUser(issueKey, input, (response) => {
      fetchedUsersArray = response;
      response.map((el) => names.push(el.name));
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        const fuzzyResult = fuzzy.filter(input, names);
        resolve(
          fuzzyResult.map((el) => el.original),
        );
      }, 2000);
    });
  },
  /**
   * Assign the issue for the selected user
   * @param {*} username
   */
  findAccountAndAssign(username) {
    const options = {
      /**
       *  Each element in fetchedUsersArray array is an object, not a string.
       *  We can pass in a function that is called on each element in the array to
       *  extract the name to fuzzy search against. In this case, element.name
       */
      extract(el) {
        return el.name;
      },
    };
    const fuzzyResult = fuzzy.filter(username, fetchedUsersArray, options);
    /**
     * @returns ['accountId'] of the selected User
     */
    const accountId = fuzzyResult.map((el) => el.original.accountId);

    /**
     * finally assign the issue to the selected user expected format.
     * { }
     */
    issue.assignIssue(issueKey, accountId[0], username);
  },
};
