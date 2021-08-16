/**
 * This module contains command sub-command related to JIRA board
 */
const program = require('commander');
const { openMyboard } = require('../operations/boards');

exports.loadBoardCommands = () => {
  const openBoardCommand = program
    .command('board')
    .description('jira board activity')
    .action(() => {
      // show the available board commands
      openBoardCommand.help();
    });

  /**
   * Opens The JIRA Board that You had Set as Default with your assigned tasks.
   */
  openBoardCommand.command('mine')
    .description('Opens your default JIRA board with with your assigned tasks')
    .action(() => {
      openMyboard(true);
    });

  openBoardCommand.command('show')
    .description('Opens The JIRA Board that You had Set as Default.')
    .action(() => {
      openMyboard(false);
    });

  // Set Your Default JIRA Board so that you can open it directly
  openBoardCommand.command('set <boardname>')
    .description('Set Your Default JIRA Board')
    .action(() => {
      // select from the default board if present
      // if not then open board with selected my profile
    });
};
