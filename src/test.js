const authenticate = require("./authentication");
const chalk = require("chalk");
const consoleApi = require("./api/console");
const logUpdate = require("log-update");
const ora = require("ora");
const util = require("./utils");

function add() {
    authenticate.currentUser().myself.getMyself({}, function(error, success) {
        console.log(success)
    })
}

add();
