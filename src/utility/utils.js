/**
 * Utils for the common funcional Usages
 */
const datetimeformat = require('dateformat');
const ora = require('ora');
const Configstore = require('configstore');

// apis
const consoleApi = require('./console');

const jiraconfig = new Configstore('jiraconfig');

module.exports = {
  /**
   * @returns `https://yourcompanyjira.net`
   */
  getBaseUrl() {
    const hostname = jiraconfig.get('hostname');
    const url = `https://${hostname}`;
    return url;
  },

  /**
   * @returns `yourcompanyjira.net`
   */
  getHostName() {
    const hostname = jiraconfig.get('hostname');
    return hostname;
  },

  getEncodedString() {
    const encodedString64 = jiraconfig.get('');
    return encodedString64;
  },

  /**
   * Returns the value that is stored in the configStore
   * {
      "hostname": "yourhostname",
      "encodedString": "username:password:base64",
      ......values you have saved
    }%
   *
   * @param {string} key
   * @returns {string}
   */
  getConfig: (key) => jiraconfig.get(key),
  /**
    * property = { key: value }
    * @param {Object} property
    * @returns null
    */
  setConfig: (property) => jiraconfig.set(property),
  /**
   * @returns Date & Time
   * @format 10/May/19 12:11 PM
   * @param {*} datetime
   */
  formatDate(datetime) {
    return datetimeformat(datetime, '');
  },

  /**
   * Retruns the bgcolor for text on basis of issueType
   * @param {} key issueType
   */
  setIssueColor(key) {
    switch (key) {
      case 'Bug':
        return consoleApi.bgRedBright(key);
      case 'Improvement':
        return consoleApi.printBgGreenBright(key);
      case 'New Feature':
        return consoleApi.printBgGreenBright(key);
      case 'Epic':
        return consoleApi.bgMagentaBright(key);
      case 'Story':
        return consoleApi.printBgGreenBright(key);
      case 'Sub-task':
        return consoleApi.printbgBlueBright(key);
      case 'Task':
        return consoleApi.printbgBlueBright(key);
      default:
        return consoleApi.printbgBlueBright(key);
    }
  },
  /**
   * returns  the ora object
   * we can use to start and stop the loader using the object
   * @param {*} options
   */
  spinner(options) {
    let modifiedOptions;
    if (typeof options === 'string') {
      modifiedOptions = { text: options };
    } else {
      modifiedOptions = options;
    }
    const spinnerParams = {
      ...modifiedOptions,
      text: '""',
      color: 'blue',
      spinner: 'point',
    };
    return ora(spinnerParams);
  },
};
