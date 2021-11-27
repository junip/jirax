/**
 * This module contains `command` sub-commands related to JIRA board
 */
/**
 * ---  Available Commands
 * jirax board mine - 'Opens your default JIRA board with with your assigned tasks'
 * jirax board set -   'Set Your Default JIRA Board'
 * jirax board show - 'Opens The JIRA Board that You had Set as Default.'
 */
const program = require('commander');
const { openMyboard } = require('../operations/Boards');
const board = require('../api/board');
exports.loadBoardCommands = () => {
    const openBoardCommand = program
        .command('board')
        .description('jira board activity')
        .action(() => {
            openBoardCommand.help();
        });

    /**
     * Opens The JIRA Board that You had Set as Default with your assigned tasks.
     */
    openBoardCommand
        .command('mine')
        .description(
            'Opens your default JIRA board with with your assigned tasks'
        )
        .action(() => {
            openMyboard(true); // opens default with your id preselected
        });

    openBoardCommand
        .command('show')
        .description('Opens The JIRA Board that You had Set as Default.')
        .action(() => {
            openMyboard(false); // opens default
        });

    // Set Your Default JIRA Board so that you can open it directly
    openBoardCommand
        .command('set')
        .description('Set Your Default JIRA Board')
        .action(answers => {
            // select from the default board if present
            // if not then open board with selected my profile
            board.getBoards();
        });
};
