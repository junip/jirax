/**
 * Encoding  of expected string by JIRA API  to base64 for the API CALLS 
 * 
 * `https://confluence.atlassian.com/cloud/api-tokens-938839638.html`
 * 
 * Rules for fetching JIRA API's
 * 
 * Encode to Base64 username:password
 * using node.js Buffer Class `https://nodejs.org/api/buffer.html`
 */
"use strict";

module.exports = encodeString;

function encodeString(config) {

    let USER_NAME = config.user_name ? config.user_name : "junip.dewan@promobitech.com";
    let USER_API_TOKEN = config.token ? config.token : "WwUjxh5TM2QkGovimPrc2FDB";
    let STRING_FORMAT = USER_NAME + ':' + USER_API_TOKEN

    // encode the string to BASE64 
    let base64EncodedData = Buffer.from(STRING_FORMAT).toString('base64')

    this.encodedString = function() {
        return base64EncodedData;
    }
}