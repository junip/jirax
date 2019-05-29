/**
 *  APIS to use the print message in console that uses
 *  Figlet - `https://github.com/cmatsuoka/figlet`
 *  Chalk - `https://github.com/chalk/chalk`
 *  For terminal styling
 *
 *  A wrapper for the Figlet and Chalk to print awesome inputs
 */
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
  }
};
