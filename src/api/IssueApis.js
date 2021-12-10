/**
 * Used to connect JIRA issue APIS
 */
const open = require('open');
const Configstore = require('configstore');
const authService = require('../services/AuthServices');
const util = require('../utility/utils');
const consoleApi = require('../utility/console');
const configStore = new Configstore('jiraconfig');

module.exports = {
   /**
    * this method opens the issues for the given project key
    * @param {*} projectKey 
    */
    openProjectIssues(projectKey) {
        const hostName = util.getHostName();
        const URL = `https://${hostName}/jira/software/c/projects/${projectKey}/issues`;
        open(URL);
    },
    // /**
    //  * A method return array of transtions available for the specific issues
    //  * @param options.issuekey isssue keys to which this
    //  * @param {*} options
    //  */
    
    assignIssue(issueKey, accountId, username) {
        const options = {
            issueKey,
            accountId
        };
        const spinner = util.spinner(
            `Assigning the issue ${issueKey} to ${username}`
        );
        spinner.start();
        authService.jiraConnector()
            .issue.assignIssue(options, (error, success) => {
                if (success || error) {
                    spinner.stop();
                }
                if (error) {
                    consoleApi.printError('Issue Cannnot be assigned');
                }
                if (success) {
                    const message = `Issue ${consoleApi.chalkRed(
                        issueKey
                    )} ${consoleApi.chalkGreen(
                        'is assigned to'
                    )} ${consoleApi.printbgCyan(username)}`;
                    consoleApi.printInfo(message);
                }
            });
    },
    /**
     * Assign the issue to self i.e logged in user
     * @param issueKey
     * @param {*} issueKey
     */
    assignSelf(issueKey) {
        const accountId = configStore.get('accountId');
        const username = configStore.get('displayName');
        module.exports.assignIssue(issueKey, accountId, username);
    },
    // /**
    //  * Get the issue statuses of project for the given issue
    //  * @param {*} issueKey
    //  */

    getStoredTranstions(issueKey, cb) {
        const key = issueKey.split('-')[0];
        const keyPresent = configStore.get(key);
        if (!keyPresent) {
            module.exports.getTranstions(issueKey, data => cb(data));
        } else {
            const transitions = configStore.get(key);
            return cb(transitions);
        }
    },
    // ------------------------------COMMENTS RELATED FUNCTIONS------------------>
    /**
     *  Add comment to the issue
     * * { issueKey: 'SFMAC-19', comment: 'some comment'"}
     * @param {*} options 
     */
    addComment(options) {
        const spinner = util.spinner('Posting your comment. Please wait');
        spinner.start();
        authService.jiraConnector()
            .issue.addComment(options, (error, response) => {
                if (response) {
                    spinner.stop();
                    consoleApi.printInfo('Comment added successfully');
                }
                if (error) {
                    spinner.stop();
                    consoleApi.printError('No issue with mentioned key found');
                }
            });
    },
     
    /**
     * Get all the comments for the specific issue
     * @param {*} issueKey
     */
    getComments(issueKey) {
        const spinner = util.spinner({
            text: 'Fetching data...',
            spinner: 'earth'
        });
        spinner.start();
        authService.jiraConnector()
            .issue.getComments({ issueKey }, (error, response) => {
                if (response) {
                    spinner.stop();
                    if (response.comments.length === 0) {
                        consoleApi.printInfo('No Comments Found');
                    } else {
                        response.comments.map(comment => {
                            console.log(
                                `${comment.id} ${consoleApi.chalkGreen(
                                    comment.author.displayName.split(' ')[0]
                                )} ${comment.body} \n`
                            );
                        });
                    }
                }
            });
    },
    /**
     * * Delete the comment for the given issueKey
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.commentId The id of the comment.
     * @param {*} opts
     */

    deleteComment(opts) {
        const spinner = util.spinner('Deleting comment .....');
        spinner.start();
        authService.jiraConnector()
            .issue.deleteComment(opts, (error, response) => {
                if (error) {
                    spinner.stop();
                    consoleApi.printError('Error while deleting the comment');
                }
                if (response) {
                    spinner.stop();
                    consoleApi.printInfo('Comment deleted');
                }
            });
    }
};
