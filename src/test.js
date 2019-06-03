const authenticate = require("./authentication");
const chalk = require("chalk");
("use strict");
const logUpdate = require("log-update");
const ora = require("ora");
const util = require("./utils");

//const spinner = cliSpinners[process.argv[2] || 'dots'];
let i = 0;
const spinner = ora({
  text: "Loading unicorns",
  spinner: "point",
  color: "blue"
});
//spinner.start()
// setTimeout(() => {
// 	spinner.stop();
// }, 1000);

// $ node example.js nameOfSpinner

//function fetchMyIssue() {
//   authenticate.currentUser().search.search(
//     {
//       jql: "assignee = currentUser() AND resolutetion = Unresolved  "
//     },
//     function(error, response) {
//       //console.log(response.issues[0])
//       let issues = response.issues.map(issue => {
//         return {
//           key: issue.key,
//           summary: issue.fields.summary,
//           type: issue.fields.issuetype.name
//         };
//       });
//       issues.map(issue => console.log(`${issue.key}, ${issue.type}\n`));
//     }
//   );
//   console.log(chalk.white.bgBlueBright.bold("Task"));
//   console.log(chalk.white.bgRedBright.bold("Bug"));
//   console.log(chalk.hex("#212321").bgGreenBright.bold("Improvement"));
//   console.log(chalk.white.bgMagentaBright.bold("Epic"));
//   console.log(chalk.hex("#2c3331").bgGreenBright.bold("Story"));
//}

// spinner.start();

// console.log('00000')
// console.log('00000')
// console.log('00000')
// console.log('00000')
// console.log('00000')
// console.log('00000')
// console.log('00000')
// console.log('00000')
// console.log('00000')

// spinner.stop();
//console.log(chalk.hex('#8acf45').hex('#8222e').bold('asd'))

function test() {
  util.spinner("this is testing").start();
}

test();
