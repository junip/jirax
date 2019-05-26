#!/usr/bin/env node
/**
 * After adiing this link add few changes in package.json file
 * "preferGlobal": true,
  "bin": "./lib/Commands.js",
   bin prefers to the current file name from directly we can initiate the command
 */

/**
 * All Cli commands goes here
 * 
 * `https://github.com/tj/commander.js/`
 *  CLI argument processing tool
 */

const program = require('commander');
const loginQuestion = require('../api/Questions');
const consoleApi = require('../api/Console')
const saveInput = require('./SaveInput');
const issueClient = require('../api/IssueClient');
const printdetails = require('../api/PrintDetails');
var Configstore = require('configstore');

var Table = require('cli-table3');
var argv = require('minimist')(process.argv.slice(2));

const configStore = new Configstore('jiraconfig');
const print = new consoleApi();
const question = new loginQuestion();
const input = new saveInput();
const issue = new issueClient();
const tablularPrint = new printdetails();


// jira-cli --verrsion
program.version('1.0.0')
    .description('Cli tool for JIRA')

// jira-cli login 
program.command('login')
        .description("Login using API TOKEN")
        .action(()=>{
            // prompt question
            // verify and save
            let isLoggedIn =  configStore.get('encodedString');

            if(!isLoggedIn) {
                question.askCredential().then(answers => {
                    input.verifyAndSave(answers);
                });
            } else {
                print.printInfo("YOU ARE ALREADY LOGGEDIN")
            }
        });
 
// find ISSUE
program.command('open-issue')
        .description("Browse the  issue")
        .action(()=>{
            let key = argv._[1]
            if(!key.length) {
                print.printError("Please enter the issue number")
            } else {
                issue.openIssue(key)
            }
        })
// issue details        
program.command('issue-detail')
        .description("Prints the basic issue details")
        .action(()=>{
            let key = argv._[1]
            if(!key.length) {
                print.printError("Please enter the issue number")
            } else {
                tablularPrint.printIssueDetails({issueKey: key});
            }
            
        })
        


program.parse(process.argv);