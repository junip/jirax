/**
 * JIRA APIS related to jira board
 */

// authentication
const fuzzy = require('fuzzy');
const open = require('open');
const inquirer = require('inquirer');
const autocompletePrompt = require('inquirer-autocomplete-prompt');

const jira = require('../authentication');

inquirer.registerPrompt('autocomplete', autocompletePrompt);

let names = [];
module.exports = {
  async openBoard(boardId) {
    await open(
      `https://technine.atlassian.net/secure/RapidBoard.jspa?rapidView=${boardId}`,
    );
  },

  getBoards() {
    jira.currentUser().board.getAllBoards({}, (err, response) => {
      if (response) {
        names = response.values.map((el) => el.name);
        inquirer
          .prompt([
            {
              type: 'autocomplete',
              name: 'name',
              message: 'Please search for the board you want to open',
              source: module.exports.searchProjects,
              pageSize: 5,
            },
          ])
          .then((answers) => {
            // assign the issue to selected user

            const boardId = response.values.filter(
              (el) => el.name === answers.name,
            )?.[0]?.id;
            module.exports.openBoard(boardId);
          });
      } else {
        console.log('---', err);
      }
    });
  },

  searchProjects(answers, input) {
    input = input || '';
    return new Promise((resolve) => {
      setTimeout(() => {
        const fuzzyResult = fuzzy.filter(input, names);
        resolve(
          fuzzyResult.map((el) => el.original),
        );
      }, 300);
    });
  },
};
