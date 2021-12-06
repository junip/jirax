/**
 * This module contains the utlity methods related to the URL
 * mostly used in opening URL with some base and secondary value.
 */
const open = require('open');
const util = require('./utility/utils');
const BOARD_URL = `${util.getBaseUrl()}/secure/RapidBoard.jspa?rapidView=`;
const ISSUE_URL = `${util.getBaseUrl()}/browse`;

/**
 * Opens the given URL
 * @param {*} url
 */
exports.openURL = async url => {
    await open(url);
};

/**
 * @return {string} boardURL
 * https://yourcompany.atlassian.net/secure/RapidBoard.jspa?rapidView=${boardId}
 * @param {*} brandId
 */
exports.boardURL = (boardId, accountId = null) =>
    accountId
        ? `${BOARD_URL}${boardId}&assignee=${accountId}`
        : `${BOARD_URL}${boardId}`;

/**
 * https://yourcompany.atlassian.net/browse/Key
 * @param {*} issueKey
 * @returns
 */

exports.issueURL = issueKey => {
    return `${ISSUE_URL}/${issueKey}`;
};
