/**
 * Finding all the projects of the user 
 * all project related apis goes here.
 */

var jiraAuth = require('../lib/Authentication'); 
var jira = new jiraAuth({});

//module.exports = Project

/**
 * user's projects related JIRA APIS 
 */
// function Project() {
    
//     this.allProject = function() {
//         jira.project.getAllProjects({}, function(error, response){
//             console.log(response)
//         })
//     }
// }

function allProject() {
    jira.authenticate().project.getAllProjects({}, function(error, response){
        let projectKeys = response.map(project=> i.key)
        console.log(projectKeys)
    })
}

allProject()

