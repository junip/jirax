/**
 * All Task Related APIs goes here
 */

const fuzzy = require('fuzzy');
const inquirer = require('inquirer');
const autocompletePrompt = require('inquirer-autocomplete-prompt');
const authenticate = require('../services/AuthServices');
inquirer.registerPrompt('autocomplete', autocompletePrompt);
const axiosConfig = require('../services/AxiosService');
const authService = require('../services/AuthServices');
const store = require('../Store');
const log = require('../utility/console');
const util = require('../utility/utils');
const print = require('../operations/PrintIIssue');
const statusSpinner = util.spinner('Fetching available statuses.....');
const fetchingIssueSpinner = util.spinner({
    text: 'Loading details..',
    spinner: 'moon'
});

// Initialize
module.exports = {
    changeIssueStatus(issueKey) {
        let api = '/rest/api/2/issue/' + issueKey;
        statusSpinner.start();

        authService
            .jira()
            .issues.getTransitions({
                issueIdOrKey: issueKey
            })
            .then(response => {
                statusSpinner.stop();
                let availableTranstions = response.transitions.map(t => ({
                    name: t.name,
                    value: t.id
                }));

                var names = availableTranstions.map(el => el.name);
                inquirer
                    .prompt([
                        {
                            type: 'autocomplete',
                            name: 'name',
                            message:
                                'Search & select for transition you want to move the task',
                            source: (answers, input) => {
                                input = input || '';
                                return new Promise(resolve => {
                                    setTimeout(() => {
                                        const fuzzyResult = fuzzy.filter(
                                            input,
                                            names
                                        );
                                        resolve(
                                            fuzzyResult.map(el => el.original)
                                        );
                                    }, 300);
                                });
                            },
                            pageSize: 6
                        }
                    ])
                    .then(answers => {
                        let selectedTrans = availableTranstions.find(
                            e => e.name === answers.name
                        );
                        module.exports.doTransition(issueKey, selectedTrans);
                    });
            })
            .catch(error => {
                statusSpinner.stop();
                console.log('error', error.response.status);
            });
    },

    searchTransitions(answers, input) {
        input = input || '';
        return new Promise(resolve => {
            setTimeout(() => {
                const fuzzyResult = fuzzy.filter(input, names);
                resolve(fuzzyResult.map(el => el.original));
            }, 300);
        });
    },

    // Change issue to another status
    doTransition(issueKey, transition) {
        let transspin = util.spinner('Transitioning....');
        transspin.start();
        let params = {
            issueIdOrKey: issueKey,
            transition: {
                id: parseInt(transition.value),
                name: transition.name
            }
        };
        authService
            .jira()
            .issues.doTransition(params, response => {
                if (response) {
                    transspin.stop();
                    log.printInfo('Your issue changed to ' + transition.name);
                }
            })
            .then(response => {})
            .catch(error => {
                console.log('----', error.response);
            });
    },

    fetchTaskDetails(issueKey) {
        fetchingIssueSpinner.start();
        authService
            .jira()
            .issues.getIssue({ issueIdOrKey: issueKey })
            .then(res => {
                if (res) {
                    fetchingIssueSpinner.stop();
                    print.printIssueDetails(res);
                }
            })
            .catch(error => {
                console.log(error.response.status);
            });
    }
};
