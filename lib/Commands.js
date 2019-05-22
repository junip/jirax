/**
 * All Cli commands goes here 
 *  
 * used Commanderjs
 * 
 * `https://github.com/tj/commander.js/`
 */
const program = require('commander');


// cli version

program.version('1.0.0')
    .description('Cli tool for JIRA')


program.command('projects')
        .alias('a')
        .description("Finding your all projects")
        .action(()=>{
            
        })

program.parse(process.argv  )        