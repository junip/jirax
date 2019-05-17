/**
 * Encoding  of string in below mentioned format for the API CALLS
 * to Base64 for API fetch to JIRA API
 * 
 * https://confluence.atlassian.com/cloud/api-tokens-938839638.html
 * 
 * Rules for fetching JIRA API's
 * 
 * Encode to Base64 username:password
 * 
 */

const USER_NAME = "junip.dewan@promobitech.com"
const USER_API_TOKEN = "WwUjxh5TM2QkGovimPrc2FDB"
const ENCODINGFORMAT = USER_NAME + ':' + USER_API_TOKEN

let bufffer = new Buffer(ENCODINGFORMAT);
let base64EncodedData = bufffer.toString('base64');

function encodedString() {
    return base64EncodedData;
}

module.exports = encodedString();