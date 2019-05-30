/**
 * Utils for the common funcional Usages
 */
const Configstore = require("configstore");
const jiraconfig = new Configstore("jiraconfig");

module.exports = {
  getBaseUrl: function() {
    let hostname = jiraconfig.get("hostname");
    let url = `https://${hostname}`;
    return url;
  },

  getHostName: function() {
    let hostname = jiraconfig.get("hostname");
    return hostname;
  },

  getEncodedString: function() {
    let encodedString64 = jiraconfig.get("encodedString");
    return encodedString64;
  }
};
