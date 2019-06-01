
const chalk = require("chalk");
const figlet = require("figlet");

module.exports = {

  printFigletRed: function(message) {
    console.log(
      chalk.red(figlet.textSync(message, { horizontalLayout: "full" }))
    );
  },

  printFigletYellow: function(message) {
    console.log(
      chalk.yellow(figlet.textSync(message, { horizontalLayout: "full" }))
    );
  },

  printError: function(message) {
    console.log(chalk.red.bold(message));
  },

  printInfo: function(message) {
    console.log(chalk.green.bold(message));
  },

  printBgRed: function(message) {
    return  chalk.black.bgRed.bold(`${message}`)
  },

  printBgGreen: function(message) {
    return  chalk.black.bgGreen.bold(`${message}`)
  },

  printBgBlue: function(message) {
    return  chalk.black.bgBlue.bold(`${message}`)
  },

  printBgYellow: function(message) {
    return  chalk.black.bgYellow.bold(`${message}`)
  },

  bgMagenta: function(message) {
    return  chalk.black.bgMagenta.bold(`${message}`)
  },

  printBgGreenBright: function(message) {
    return  chalk.black.bgGreenBright.bold(`${message}`)
  },

  printbgCyan: function(message) {
    return  chalk.black.bgCyan.bold(`${message}`)
  },

  bgMagentaBright: function(message) {
    return  chalk.black.bgMagentaBright.bold(`${message}`)
  },

  printBgGreenBright: function(message) {
    return  chalk.black.bgGreenBright.bold(`${message}`)
  },

  printbgBlueBright: function(message) {
    return  chalk.white.bgBlueBright.bold(`${message}`)
  },
};
