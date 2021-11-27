#!/usr/bin/env node

const program = require('commander');
const input = require('./store');

const { loadBoardCommands } = require('./commands/boards');
const { loadTasksCommands } = require('./commands/tasks')

program.version('1.0.0').description('CLI Tool for accessing JIRA');
program
    .command('login')
    .description('Login using JIRA API Token')
    .action(() => {
        input.signUpUser();
    });

program
    .command('logout')
    .description('Remove you JIRA credentials')
    .action(() => {
        input.removeCredentials();
    });

// Add other sub commands here
loadBoardCommands();
loadTasksCommands();

program.parse(process.argv);
