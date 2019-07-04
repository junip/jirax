/**
 * Search user autocompleted and find the user
 */

const inquirer = require("inquirer");
const autocompletePrompt = require("inquirer-autocomplete-prompt");
inquirer.registerPrompt("autocomplete", autocompletePrompt);
const fuzzy = require("fuzzy");
const user = require("./api/user");
const issue = require("./api/issue_client");

var issueKey;
var fetchedUsersArray;

module.exports = {
  /**
   * prompt user search option to assign issue
   * @param {*} issue
   */
  searchUser: function(issue) {
    issueKey = issue;
    inquirer
      .prompt([
        {
          type: "autocomplete",
          name: "name",
          message: "Please search for the user to assign",
          source: module.exports.searchUsers,
          pageSize: 5
        }
      ])
      .then(function(answers) {
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
  searchUsers: function(answers, input) {
    input = input || "";
    var names = [];
    user.searchAssignableUser(issueKey, input, function(response) {
      fetchedUsersArray = response;
      response.map(el => names.push(el.name));
    });

    return new Promise(function(resolve) {
      setTimeout(function() {
        var fuzzyResult = fuzzy.filter(input, names);
        resolve(
          fuzzyResult.map(function(el) {
            return el.original;
          })
        );
      }, 2000);
    });
  },
  /**
   * Assign the issue for the selected user
   * @param {*} username
   */
  findAccountAndAssign: function(username) {
    var options = {
      /**
       *  Each element in fetchedUsersArray array is an object, not a string.
       *  We can pass in a function that is called on each element in the array to
       *  extract the name to fuzzy search against. In this case, element.name
       */
      extract: function(el) {
        return el.name;
      }
    };
    var fuzzyResult = fuzzy.filter(username, fetchedUsersArray, options);
    let accountId = fuzzyResult.map(function(el) {
      return el.original.accountId;
    });

    /**
     * finally assign the issue to the selected user expected format.
     */
    issue.assignIssue({
      issueKey: issueKey,
      accountId: accountId[0]
    });
  }
};
