/**
 *  APIS to use the print message in console that uses 
 *  Figlet - `https://github.com/cmatsuoka/figlet`
 *  Chalk - `https://github.com/chalk/chalk`
 *  For terminal styling 
 * 
 *  A wrapper for the Figlet and Chalk to print awesome inputs
 */
const chalk = require('chalk');
const figlet = require('figlet');

module.exports = ConsoleAPI;

/**
 * on call of selected function print the message in the console
 * @param {*} message 
 */
function ConsoleAPI(message) {

    this.printRed = function(){
        console.log(chalk.red(
            figlet.textSync(message, { horizontalLayout: 'full' })
        ));
    }

    this.printYellow = function(){
        console.log(chalk.yellow(
            figlet.textSync(message, { horizontalLayout: 'full' })
        ));
    }
}


