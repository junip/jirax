// Chalk COLOURS your INPUT
// Figlet for ASCII character Font
// inquirer for the interactive output to console

const inquirer = require('inquirer');
const jiraConnector = require('jira-connector');


var jira = new jiraConnector({
    host: 'promobi.atlassian.net',
    basic_auth: {
        base64: 'anVuaXAuZGV3YW5AcHJvbW9iaXRlY2guY29tOld3VWp4aDVUTTJRa0dvdmltUHJjMkZEQg=='
    }
});

function fetchIssue() {
    jira.issue.getIssue({
        issueKey: 'SFMAC-19'
    }, function (error, issue) {
        console.log(issue);
    });
}

// // Token = WwUjxh5TM2QkGovimPrc2FDB
// console.log(chalk.yellow(
//     figlet.textSync('Junip Dewan', { horizontalLayout: 'full' })
// ));

fetchIssue();


