const authenticate = require("./authentication");
const chalk = require("chalk");
const consoleApi = require("./api/console");
const logUpdate = require("log-update");
const ora = require("ora");
const util = require("./utils");

function add() {
  authenticate.currentUser().project.getProject({projectIdOrKey: "SFMAC"}, function(error, success) {
    let name = success.lead.displayName;
    let issues = [];
    let issueType = success.issueTypes.map((issue) => {
      issues.push(issue.name)
    })
    console.log("lead", name)
    console.log("lead", success)
    console.log("issueType", issues)
  });
}


add();
