/**
 *  Encoding of expected string to base64 for the JIRA API CALLS
 * `https://confluence.atlassian.com/cloud/api-tokens-938839638.html`
 *
 * Encoded to base64 - `username:password`
 * using node.js Buffer Class `https://nodejs.org/api/buffer.html`
 *
 */

"use strict";

module.exports = {
  encodeToBase64: function(config) {
    let USER_NAME = config.user_name;
    let USER_API_TOKEN = config.api_token;
    let STRING_FORMAT = USER_NAME + ":" + USER_API_TOKEN;
    // encode the string to BASE64
    let base64EncodedData = Buffer.from(STRING_FORMAT).toString("base64");
    return base64EncodedData;
  }
};
