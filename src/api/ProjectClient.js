/**
 * user's projects related JIRA APIS
 */
const jira = require("../Authentication");
const util = require("../Utils");
const open = require("open");

module.exports = {
  /**
   * Retrurns user accessible project KEYs
   */
  projectKeys: function() {
    jira.currentUser().project.getAllProjects({}, function(error, response) {
      let projectKeys = response.map(project => i.key);
      return projectKeys;
    });
  },
  /**
   * Returns the information about the mention project's key
   * @param projectKey
   * @param format {projectIdOrKey: 'PROJECT-KEY'}
   */
  fetchProject: function(projectKey) {
    currentUser.project.getProject(projectKey, function(error, success) {
      let response = error ? error : success;
      return response;
    });
  },
  /**
   * Open JIRA Rapid Board
   * @param {*} projectKey
   */
  openRapidBoard: function(projectKey) {
    let baseURL = util.getBaseUrl();
    let UrlToOpen = `${baseURL}/secure/RapidBoard.jspa?projectKey=${projectKey}`;
    open(UrlToOpen);
  }
};
