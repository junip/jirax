/**
 * All Cli commands goes here
 * 
 * `https://github.com/tj/commander.js/`
 *  CLI argument processing tool
 */

const program = require('commander');
const loginQuestion = require('../api/Questions');
const saveInput = require('./SaveInput');

var question = new loginQuestion();
var input = new saveInput();

// jira-cli --verrsion
program.version('1.0.0')
    .description('Cli tool for JIRA')

// jira-cli login 
program.command('login')
        .description("Login using API TOKEN")
        .action(()=>{
            // prompt question
            // verify and save
            question.askCredential().then(answers => {
                input.verifyAndSave(answers);
            });
        })


program.parse(process.argv);