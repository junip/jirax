// Chalk COLOURS your INPUT
// Figlet for ASCII character Font
// inquirer for the interactive output to console

const inquirer = require('inquirer');
const jiraConnector = require('jira-connector');
var  issueClient = require('../api/IssueClient');
var issue = new issueClient();
var Table = require('cli-table3');
var table = new Table({
    head: ['Issue', 'Project','Reporter', 'Assignee']
  , colWidths: [25, 25, 25, 25]
})


var jira = new jiraConnector({
    host: 'promobi.atlassian.net',
    basic_auth: {
        base64: 'anVuaXAuZGV3YW5AcHJvbW9iaXRlY2guY29tOld3VWp4aDVUTTJRa0dvdmltUHJjMkZEQg=='
    }
});

// function fetchIssue() {
//     jira.issue.getIssue({
//         issueKey: 'SFMAC-19'
//     }, function (error, issue) {
//         console.log(issue);
//     });
// }

// // Token = WwUjxh5TM2QkGovimPrc2FDB
// console.log(chalk.yellow(
//     figlet.textSync('Junip Dewan', { horizontalLayout: 'full' })
// ));

function fetchIssue() {
    issue.getIssue({issueKey: 'SFMAC-19'},function(response){
        // console.log(response.fields.reporter)
        table.push(
            [response.key, response.fields.project.name,response.fields.reporter.displayName, response.fields.assignee.displayName]
        );
        
        console.log(table.toString());
    })
}

fetchIssue();
// fields.project.name

// fields.reporter.displayName
//fields.assignee.displayName