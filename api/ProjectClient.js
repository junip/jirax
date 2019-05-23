/**
 * Finding all the projects of the user 
 * all project related apis goes here.
 */

var jiraAuth = require('../lib/Authentication'); 
var jira = new jiraAuth({});
const currentUser = jira.authenticate();
module.exports = Project

/**
 * user's projects related JIRA APIS 
 */
function Project() {
    /**
     * Retrurns user accessible project KEYs
     */
    this.projectKeys = function() {
        currentUser.project.getAllProjects({}, function(error, response){
            let projectKeys = response.map(project=> i.key)
            return projectKeys;
        })
    }
    /**
     * Returns the information about the mention project's key
     * @param projectKey 
     * @param format {projectIdOrKey: 'PROJECT-KEY'}
     */
    this.fetchProject = function(projectKey) {
        currentUser.project.getProject(projectKey, function(error,success){
            let response =  error ? error : success
            return response;
        })
    }
}