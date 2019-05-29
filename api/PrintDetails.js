/**
 * Print the response in tabular format
 */

const issue = require('../api/IssueClient');
const Table = require('cli-table3');
module.exports = {
    /**
     * Print the issue details
     * @param {issueKey: 'SFMAC-165'}
     */
    printIssueDetails: function(issueObject) {
        
        var table = new Table({
            head: ['Issue', 'Summary','Reporter', 'Assignee', 'Status']
          , colWidths: [15, 55, 20, 20, 20]
        })

        // find and print in the console
        issue.getIssue(issueObject,function(response){
            let fields = response.fields
            table.push(
                [   response.key, 
                    fields.summary,
                    fields.reporter.displayName, 
                    fields.assignee.displayName,
                    fields.status.name
                ]
            );
            console.log(table.toString());
        })
    }
}