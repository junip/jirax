// Chalk COLOURS your INPUT
// Figlet for ASCII character Font
// inquirer for the interactive output to console
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

// import JIRA OBJECT
const jira = require('./Authentication')

function fetchIssue() {
    jira.issue.getIssue({
        issueKey: 'SFMAC-19'
    }, function (error, issue) {
        console.log(error);
        console.log(issue);
    });
}


fetchIssue();


