const chalk = require('chalk');
const figlet = require('figlet');

module.exports = {
  printFigletRed: (message) => console.log(chalk.red(figlet.textSync(message, { horizontalLayout: 'full' }))),

  printFigletYellow: (message) => console.log(chalk.yellow(figlet.textSync(message, { horizontalLayout: 'full' }))),

  printKeyColor: (message) => chalk.hex('#5e6c84').bold(`${message}`),

  chalkRed: (message) => chalk.red.bold(`${message}`),

  chalkGreen: (message) => chalk.green.bold(`${message}`),

  printError: (message) => console.log(chalk.red.bold(message)),

  printInfo: (message) => console.log(chalk.green.bold(message)),

  printBgRed: (message) => chalk.black.bgRed.bold(`${message}`),

  printBgGreen: (message) => chalk.black.bgGreen.bold(`${message}`),

  printBgBlue: (message) => chalk.black.bgBlue.bold(`${message}`),

  printBgYellow: (message) => chalk.black.bgYellow.bold(`${message}`),

  bgMagentaBright: (message) => chalk.white.bgMagentaBright.bold(`${message}`),

  bgRedBright: (message) => chalk.white.bgRedBright.bold(`${message}`),

  printBgGreenBright: (message) => chalk.hex('#2c3331').bgGreenBright.bold(`${message}`),

  printbgCyan: (message) => chalk.black.bgCyan.bold(`${message}`),

  printbgBlueBright: (message) => chalk.white.bgBlueBright.bold(`${message}`),
};
