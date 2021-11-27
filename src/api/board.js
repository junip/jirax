/**
 * JIRA APIS related to jira board
 */

const fuzzy = require('fuzzy');
const inquirer = require('inquirer');
const autocompletePrompt = require('inquirer-autocomplete-prompt');
const authService = require('../services/AuthServices');
inquirer.registerPrompt('autocomplete', autocompletePrompt);
const store = require('../store');
const log = require('../utility/console');
const util = require('../utility/utils');
const spinner = util.spinner('Fetching boards.....');

let names = [];
module.exports = {
    getBoards() {
        spinner.start();
        authService.jiraConnector().board.getAllBoards({}, (err, response) => {
            if (response) {
                spinner.stop();
                names = response.values.map(el => el.name);
                inquirer
                    .prompt([
                        {
                            type: 'autocomplete',
                            name: 'name',
                            message:
                                'Please search for the board you want to open',
                            source: module.exports.searchProjects,
                            pageSize: 6
                        }
                    ])
                    .then(answers => {
                        // assign the issue to selected user
                        const boardId = response.values.filter(
                            el => el.name === answers.name
                        )?.[0]?.id;
                        if (boardId) {
                            util.setConfig({ defaultJiraBoard: boardId });
                        }
                        log.printInfo('Your default board is set');
                    });
            } else {
                console.log('---', err);
            }
        });
    },

    searchProjects(answers, input) {
        input = input || '';
        return new Promise(resolve => {
            setTimeout(() => {
                const fuzzyResult = fuzzy.filter(input, names);
                resolve(fuzzyResult.map(el => el.original));
            }, 300);
        });
    }
};
