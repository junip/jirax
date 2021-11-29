/**
 * Print the response in tabular format
 */

const consoleApi = require('../utility/console');



module.exports = {
    printInConsole(issue) {
        consoleApi.printInfo(`Details for ${issue.key}\n`);

        console.log(`## Summary: ${consoleApi.printBgGreenBright(issue.summary)}\n`);

        console.log(
            `## ${consoleApi.printBgGreen(issue.key)}                       ${consoleApi.printbgBlueBright('STATUS')}: ${issue.status}                    ## ${consoleApi.printbgCyan('Assignee')} - ${issue.assigneeName} \n`
        );
        console.log(
            `## ${consoleApi.printbgCyan('Type')}: ${issue.issueType}                                                        ## ${consoleApi.printbgCyan('Reporter')} - ${issue.reporterName} \n`
        );
        console.log(
            `## ${consoleApi.printbgCyan('Priority')}: ${issue.priority} \n`
        );
        console.log(
            `## ${consoleApi.printbgBlueBright(
                'Description'
            )} \n`
        );
        console.log(`${issue.description}\n`);
    },

    /**
     * Print the issue details
     * @param {issueKey: 'SFMAC-165'}
     */
    printIssueDetails(response) {
        issueObject = {
            key: response.key,
            description: response.fields.description,
            reporterName: response.fields.reporter.displayName,
            assigneeName: response.fields.assignee.displayName,
            summary: response.fields.summary,
            status: response.fields.status.name,
            issueType: response.fields.issuetype.name,
            priority: response.fields.priority.name,
        };

        module.exports.printInConsole(issueObject);
    },
};
