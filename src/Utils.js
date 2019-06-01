/**
 * Utils for the common funcional Usages
 */
const Configstore = require("configstore");
const jiraconfig = new Configstore("jiraconfig");
const datetimeformat = require("dateformat");

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
  },
  /**
   * @returns Date & Time
   * @format 10/May/19 12:11 PM
   * @param {*} datetime
   */
  formatDate: function(datetime) {
    return datetimeformat(datetime, "dd/mmmm/yy, h:MM TT");
  }
};
