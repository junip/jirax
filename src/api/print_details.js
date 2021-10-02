/**
 * Print the response in tabular format
 */

const issue = require('./issue_client');
const consoleApi = require('../utility/console');
const util = require('../utility/utils');

const spinner = util.spinner({ text: 'Loading details..', spinner: 'moon' });

module.exports = {
    printInConsole(issue) {
        consoleApi.printInfo(`Details for ${issue.key}\n`);

        console.log(`## Summary: ${issue.summary}\n`);

        console.log(
            `## ${issue.key}                        Status: ${
                issue.status
            }                    ## Assignee - ${issue.assigneeName} \n`
        );

        console.log(
            `## Type: ${
                issue.issueType
            }                                                       ## Reporter - ${
                issue.reporterName
            } \n`
        );

        console.log(
            `## Priority: ${
                issue.priority
            }                                                ## Created  - ${util.formatDate(
                issue.created
            )} \n`
        );

        console.log(
            `## Environment: ${
                issue.environment ? issue.environment : 'Not Present       '
            }                                 ## Updated  -  ${util.formatDate(
                issue.updated
            )} \n`
        );

        console.log(
            `## ${consoleApi.printbgBlueBright(
                'Description'
            )}                                                     ## Resolved - ${util.formatDate(
                issue.resolved
            )} \n`
        );

        console.log(`${issue.description}\n`);
    },

    /**
     * Print the issue details
     * @param {issueKey: 'SFMAC-165'}
     */
    printIssueDetails(issueObject) {
        spinner.start();
        // find and print in the console
        issue.getIssue(issueObject, response => {
            if (response) {
                spinner.stop();
            }
            issueObject = {
                key: response.key,
                description: response.fields.description,
                reporterName: response.fields.reporter.displayName,
                assigneeName: response.fields.assignee.displayName,
                environment: response.fields.environment,
                summary: response.fields.summary,
                created: response.fields.created,
                status: response.fields.status.name,
                issueType: response.fields.issuetype.name,
                priority: response.fields.priority.name,
                created: response.fields.created,
                updated: response.fields.updated,
                resolved: response.fields.resolved
            };
            module.exports.printInConsole(issueObject);
        });
    }
};
