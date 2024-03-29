/** Issues Related commands */
const program = require('commander');
/**
 * 1. Fetch all the issue transitions.
 * 2. jirax task change KEY - Change the status of the task (transition to another status)
 * 3. jirax task detail KEY - get detail of the task. ( show the details of the task)
 * 4. jirax task assign KEY - Assign issue to another user in the same task
 */
const task = require('../api/Task');
const taskOperation = require('../operations/Task');
const assignTask = require('../operations/AssignIssue');

exports.loadTasksCommands = () => {
    const openTasksCommands = program
        .command('task')
        .description('JIRA task operations')
        .action(() => {
            // show the available issues commands
            openTasksCommands.help();
        });

    // change status of the issue
    openTasksCommands
        .command('move')
        .argument('<KEY>', 'Task KEY that you want to change')
        .description('Change the status of the task')
        .action(key => {
            task.changeIssueStatus(key);
        });

    // show details
    openTasksCommands
        .command('details')
        .argument('<KEY>', 'Task KEY to view')
        .description('Details of the Task')
        .action(key => {
            task.fetchTaskDetails(key);
        });

    // assign issue
    openTasksCommands
        .command('assign')
        .argument('<KEY>', 'Task key that to assign')
        .description('Assign task to another user')
        .action(key => {
            assignTask.searchUser(key);
        });

    // open issue
    openTasksCommands
        .command('assign-me')
        .argument('<KEY>', 'Task key to assign')
        .description('Assign Issue to Self(logged in user')
        .action(key => {
            taskOperation.assignToSelf(key)
        }); 

    // open issue
    openTasksCommands
        .command('open')
        .argument('<KEY>', 'Task key to open in browser')
        .description('Opens task in browser')
        .action(key => {
            taskOperation.openTask(key);
        });
       
};
