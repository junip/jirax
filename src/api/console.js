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

  printKeyColor: function(message) {
    return chalk.hex("#5e6c84").bold(`${message}`);
  },

  chalkGreen: function(message) {
    return chalk.green.bold(`${message}`);
  },

  printError: function(message) {
    console.log(chalk.red.bold(message));
  },

  printInfo: function(message) {
    console.log(chalk.green.bold(message));
  },

  printBgRed: function(message) {
    return chalk.black.bgRed.bold(`${message}`);
  },

  printBgGreen: function(message) {
    return chalk.black.bgGreen.bold(`${message}`);
  },

  printBgBlue: function(message) {
    return chalk.black.bgBlue.bold(`${message}`);
  },

  printBgYellow: function(message) {
    return chalk.black.bgYellow.bold(`${message}`);
  },

  bgMagentaBright: function(message) {
    return chalk.white.bgMagentaBright.bold(`${message}`);
  },

  bgRedBright: function(message) {
    return chalk.white.bgRedBright.bold(`${message}`);
  },

  printBgGreenBright: function(message) {
    return chalk.hex("#2c3331").bgGreenBright.bold(`${message}`);
  },

  printbgCyan: function(message) {
    return chalk.black.bgCyan.bold(`${message}`);
  },

  printbgBlueBright: function(message) {
    return chalk.white.bgBlueBright.bold(`${message}`);
  }
};
