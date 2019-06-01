/**
 * JIRA Apis response with jira JQL custom quesry search
 */
const authenticate = require("../authentication");

module.exports = {
  /**
   *
   * @param {*} param0
   * @param {*} callback
   * @return CurrentUser ToDo Issues
   */
  myOpenIssues: function({}, callback) {
    authenticate.currentUser().search.search(
      {
        jql: 'assignee = currentUser() AND status="To Do" order by updated DESC'
      },
      function(error, response) {
        let issues = response.issues.map(issue => {
          return {
            key: issue.key,
            summary: issue.fields.summary,
            type: issue.fields.issuetype.name
          };
        });
        return callback(issues);
      }
    );
  }
};
