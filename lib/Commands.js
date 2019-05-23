/**
 * All Cli commands goes here 
 *  
 * used Commanderjs
 * 
 * `https://github.com/tj/commander.js/`
 *  CLI argument processing tool
 */
const program = require('commander');


// cli version

program.version('1.0.0')
    .description('Cli tool for JIRA')


program.command('projects')
        .alias('a')
        .description("Finding your all projects")
        .action(()=>{
            console.log("Hello");
        })

program.parse(process.argv)        