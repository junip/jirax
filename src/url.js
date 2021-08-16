/**
 * This module contains the utlity methods related to the URL
 * mostly used in opening URL with some base and secondary value.
 */
const open = require('open');
const util = require('./utils');

/**
 * Opens the given URL
 * @param {*} url
 */
exports.openURL = async (url) => {
  await open(url);
};

/**
 * Opens board with given boardId
 * https://yourcompany.atlassian.net/secure/RapidBoard.jspa?rapidView=${boardId}
 * @param {*} brandId
 */
exports.openBoardURL = (boardId) => {
  const url = `${util.getBaseUrl()}?rapidView=${boardId}`;
  this.openURL(url);
};
