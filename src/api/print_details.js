/**
 * Print the response in tabular format
 */

const issue = require("./issue_client");
const consoleApi = require("../api/console");
const util = require("../utils");

module.exports = {

  printInConsole(issue) {
    console.log(consoleApi.printBgGreenBright("---------------------------------------------------------------------------\n\n"))

    console.log(`## Summary: ${issue.summary}\n`)                                        

    console.log(`## ${issue.key}                        Status: ${issue.status}                 ## Assignee - ${issue.assigneeName} \n`)

    console.log(`## Type: ${issue.issueType}                                             ## Reporter - ${issue.reporterName} \n`)

    console.log(`## Priority: ${issue.priority}                                           ## Created  - ${util.formatDate(issue.created)} \n`)

    console.log(`## Environment: ${issue.environment? issue.environment :  "Not Present"}                            ## Updated  -  ${util.formatDate(issue.updated)} \n`)

    console.log(`## ${consoleApi.printbgBlueBright("Description")}                                                     ## Resolved - ${util.formatDate(issue.resolved)} \n`) 

    console.log(`${issue.description}\n\n`)

    console.log(consoleApi.printBgGreenBright("---------------------------------------------------------------------------\n\n"))
  },

  /**
   * Print the issue details
   * @param {issueKey: 'SFMAC-165'}
   */
  printIssueDetails: function(issueObject) {
    // find and print in the console
    issue.getIssue(issueObject, function(response) {
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
      }
      module.exports.printInConsole(issueObject)
    });
  }
};
