/**
 * user's projects related JIRA APIS
 */
const open = require('open');
const inquirer = require('inquirer');
const jira = require('../authentication');
const util = require('../utility/utils');
const board = require('./board');

module.exports = {
  /**
   * Returns user accessible project KEYs
   */
  projectKeys() {
    jira.currentUser().project.getAllProjects({}, (error, response) => {
      const projectKeys = response.map((project) => i.key);
      return projectKeys;
    });
  },
  /**
   * Returns the information about the mention project's key
   * @param projectKey
   * @param format {projectIdOrKey: 'PROJECT-KEY'}
   */
  fetchProject(projectKey) {
    currentUser.project.getProject(projectKey, (error, success) => {
      const response = error || success;
      return response;
    });
  },
  /**
   * Open JIRA Rapid Board (Select Board and Then Open)
   * @param {*} projectKey
   */
  openBoard(projectKey) {
    board.getBoards();
    // jira.currentUser().board.getAllBoards({}, (err, response) => {
    //   console.log("Response", response);
    //   console.log("Response", err);
    //   if(response) {
    //     inquirer.prompt([
    //       {
    //         type: "list",
    //         name: "board",
    //         message: "Please select the transtion type",
    //         choices: response.values
    //       }
    //     ]).then(answers => {
    //       console.log(response.values.filter((item) => answers.board === item.name)[0]?.id);
    //     })
    //   }
    // })
    // let baseURL = util.getBaseUrl();
    // let UrlToOpen = `${baseURL}/secure/RapidBoard.jspa?projectKey=${projectKey}`;
    // await open(`https://technine.atlassian.net/secure/RapidBoard.jspa?rapidView=79`);
  },
};
