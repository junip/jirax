/**
 * Used to connect JIRA issue APIS
 */
const open = require('open');
const Configstore = require('configstore');
//const authenticate = require('../authentication');
const util = require('../utility/utils');
const consoleApi = require('../utility/console');

const configStore = new Configstore('jiraconfig');

module.exports = {
    /**
     * @param issueKey = {}
     * Note that this object must contain EITHER an issueId or issueKey
     * issueKey - 'TEST-12' or issueId
     */
    // getIssue(issueKey, callback) {
    //     authenticate
    //         .currentUser()
    //         .issue.getIssue(issueKey, (error, success) => {
    //             const data = success || error;
    //             return callback(data);
    //         });
    // },
    // /**
    //  * Opens the issue in the default browser
    //  * hostname/browse/issuekey
    //  * @issueKey
    //  */
    // openIssue(issueKey) {
    //     const hostName = util.getHostName();
    //     const URL = `https://${hostName}/browse/${issueKey}`;
    //     open(URL);
    // },
    // /**
    //  * this method opens the issues for the given project key
    //  *
    //  * @param {*} projectKey
    //  */
    // openProjectIssues(projectKey) {
    //     const hostName = util.getHostName();
    //     const URL = `https://${hostName}/projects/${projectKey}/issues`;
    //     open(URL);
    // },
    // /**
    //  * A method return array of transtions available for the specific issues
    //  * @param options.issuekey isssue keys to which this
    //  * @param {*} options
    //  */
    // getTranstions(issueKey, cb) {
    //     // const key = issueKey.split('-')[0];
    //     // const spinner = util.spinner({
    //     //     text: 'Fetching available transtions...',
    //     //     spinner: 'earth'
    //     // });
    //     issueKey = 'OHEA'
    //     //spinner.start();
    //     authenticate
    //         .jiraConnector()
    //         .project.getStatuses('OHEA' , (error, success) => {
    //             console.log("error",error )
    //             console.log("success",success )
    //             // const availableTranstions = [];
    //             // if (success) {
    //             //     spinner.stop();
    //             //     success.transitions.map(t => {
    //             //         availableTranstions.push({ name: t.name, value: t.id });
    //             //     });
    //             //     configStore.set(key, availableTranstions);
    //             //     return cb(availableTranstions);
    //             // }
    //             // if (error) {
    //             //     spinner.stop();
    //             //     cb(error.errorMessages[0]);
    //             // }
    //         });
    // },
    // /**
    //  *  This method changes the status of the issue
    //  *
    //  * @param{String} object.transtion - id to which issue transtion will happen
    //  * @param{String} object.issueKey - issuekey for which issue transtion happen
    //  * @param {*} object
    //  */
    // changeStatus(object) {
    //     const spinner = util.spinner('Changing status...');
    //     spinner.start();
    //     authenticate
    //         .currentUser()
    //         .issue.transitionIssue(object, (error, success) => {
    //             if (success) {
    //                 const key = object.issueKey.split('-')[0];
    //                 const transitionName = configStore.get(key).filter(el => {
    //                     if (el.value === object.transition) {
    //                         return el.name;
    //                     }
    //                 });
    //                 const message = `${consoleApi.chalkRed(
    //                     object.issueKey
    //                 )} is transitioned to ${consoleApi.chalkGreen(
    //                     transitionName[0].name
    //                 )}`;
    //                 spinner.stop();
    //                 console.log(message);
    //             }
    //             if (error) {
    //                 spinner.stop();
    //                 consoleApi.printError(error);
    //             }
    //         });
    // },
    // assignIssue(issueKey, accountId, username) {
    //     const options = {
    //         issueKey,
    //         accountId
    //     };
    //     const spinner = util.spinner(
    //         `Assigning the issue ${issueKey} to ${username}`
    //     );
    //     spinner.start();
    //     authenticate
    //         .currentUser()
    //         .issue.assignIssue(options, (error, success) => {
    //             if (success || error) {
    //                 spinner.stop();
    //             }
    //             if (error) {
    //                 consoleApi.printError('Issue Cannnot be assigned');
    //             }
    //             if (success) {
    //                 const message = `Issue ${consoleApi.chalkRed(
    //                     issueKey
    //                 )} ${consoleApi.chalkGreen(
    //                     'is assigned to'
    //                 )} ${consoleApi.printbgCyan(username)}`;
    //                 consoleApi.printInfo(message);
    //             }
    //         });
    // },
    // /**
    //  * Assign the issue to self i.e logged in user
    //  * @param issueKey
    //  * @param {*} issueKey
    //  */
    // assignSelf(issueKey) {
    //     const accountId = configStore.get('accountId');
    //     const username = configStore.get('username');
    //     module.exports.assignIssue(issueKey, accountId, username);
    // },
    // /**
    //  * Get the issue statuses of project for the given issue
    //  * @param {*} issueKey
    //  */
    // getStoredTranstions(issueKey, cb) {
    //     const key = issueKey.split('-')[0];
    //     const keyPresent = configStore.get(key);
    //     if (!keyPresent) {
    //         module.exports.getTranstions(issueKey, data => cb(data));
    //     } else {
    //         const transitions = configStore.get(key);
    //         return cb(transitions);
    //     }
    // },
    // // ------------------------------COMMENTS RELATED FUNCTIONS------------------>
    // /** Add comment to the issue
    //  * { issueKey: 'SFMAC-19', comment: 'some comment'"}
    //  * @param {*} options
    //  */
    // addComment(options) {
    //     const spinner = util.spinner('Posting your comment. Please wait');
    //     spinner.start();
    //     authenticate
    //         .currentUser()
    //         .issue.addComment(options, (error, response) => {
    //             if (response) {
    //                 spinner.stop();
    //                 consoleApi.printInfo('Comment added successfully');
    //             }
    //             if (error) {
    //                 spinner.stop();
    //                 consoleApi.printError('No issue with mentioned key found');
    //             }
    //         });
    // },
    // /**
    //  * Get all the comments for the specific issue
    //  * @param {*} issueKey
    //  */
    // getComments(issueKey) {
    //     const spinner = util.spinner({
    //         text: 'Fetching data...',
    //         spinner: 'earth'
    //     });
    //     spinner.start();
    //     authenticate
    //         .currentUser()
    //         .issue.getComments({ issueKey }, (error, response) => {
    //             if (response) {
    //                 spinner.stop();
    //                 if (response.comments.length === 0) {
    //                     consoleApi.printInfo('No Comments Found');
    //                 } else {
    //                     response.comments.map(comment => {
    //                         console.log(
    //                             `${comment.id} ${consoleApi.chalkGreen(
    //                                 comment.author.displayName.split(' ')[0]
    //                             )} ${comment.body} \n`
    //                         );
    //                     });
    //                 }
    //             }
    //         });
    // },
    // /*
    //  * Delete the comment for the given issueKey
    //  * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    //  * @param {string} opts.commentId The id of the comment.
    //  * @param {*} opts
    //  */
    // deleteComment(opts) {
    //     const spinner = util.spinner('Deleting comment .....');
    //     spinner.start();
    //     authenticate
    //         .currentUser()
    //         .issue.deleteComment(opts, (error, response) => {
    //             if (error) {
    //                 spinner.stop();
    //                 consoleApi.printError('Error while deleting the comment');
    //             }
    //             if (response) {
    //                 spinner.stop();
    //                 consoleApi.printInfo('Comment deleted');
    //             }
    //         });
    // }
};
