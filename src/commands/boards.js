/**
 * This module contains command sub-command related to JIRA board
 */

const program = require('commander');


exports.loadBoardCommands = () => {
  const openBoardCommand = program
    .command('board')
    .description('Select & Open Available JIRA Board')
    .action(() => {
      // TODO - search board API integrations
      // project.openBoard();
    });

  /**
   * Opens The JIRA Board that You had Set as Default.
   */
  openBoardCommand.command('mine')
    .description('Opens The JIRA Board that You had Set as Default.')
    .action(() => {
      // open default board
    });

  // Set Your Default JIRA Board so that you can open it directly
  openBoardCommand.command('set <nameofboard>')
    .description('Set Your Default JIRA Board')
    .action((source, argument) => {
      // select from the default board if present
      // if not then open board with selected my profile
    });
};
