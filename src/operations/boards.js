const { openURL, boardURL } = require('../Url');
const config = require('../utility/utils');
const print = require('../utility/console');

/**
 * Open the default set JIRA RAPID BOARD
 */
exports.openMyboard = (myprofile = false) => {
    const boardId = config.getConfig('defaultJiraBoard');
    const accountId = myprofile ? config.getConfig('accountId') : null;
    if (boardId) {
        const url = boardURL(boardId, accountId);
        openURL(url);
    } else {
        print.printError('No board found! Please select a default board.');
    }
};
