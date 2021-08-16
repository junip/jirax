#!/usr/bin/env node

const program = require('commander');
const input = require('./store');

const util = require('./utility/utils');
const print = require('./utility/console');
const { loadBoardCommands } = require('./commands/boards');

program.version('1.0.0').description('CLI Tool for accessing JIRA');
program.option('-l, login', 'Login Using JIRA API Token');

// load board sub commands
loadBoardCommands();

// parse argument
program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
} else {
  const encodedString = util.getEncodedString();
  if (!encodedString && !program.login) {
    print.chalkRed('Please login using command');
    print.chalkGreen('jirax login');
  }

  // getting the current executed command
  const currentCommand = program.rawArgs[2];
  switch (currentCommand) {
    case 'login':
      input.signUpUser();
      break;
    case '-l':
      input.signUpUser();
      break;
    default:
      break;
  }
}
