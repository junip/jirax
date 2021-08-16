/**
 *  Encoding of expected string to base64 for the JIRA API CALLS
 * `https://confluence.atlassian.com/cloud/api-tokens-938839638.html`
 *
 * Encoded to base64 - `username:password`
 * using node.js Buffer Class `https://nodejs.org/api/buffer.html`
 *
 */

module.exports = {
  encodeToBase64(config) {
    const USER_NAME = config.user_name;
    const USER_API_TOKEN = config.api_token;
    const STRING_FORMAT = `${USER_NAME}:${USER_API_TOKEN}`;
    // encode the string to BASE64
    const base64EncodedData = Buffer.from(STRING_FORMAT).toString('base64');
    return base64EncodedData;
  },
};
