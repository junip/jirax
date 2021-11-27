const Configstore = require('configstore');
const configStore = new Configstore('jiraconfig');
const axios = require('axios');
const emailAddress = configStore.get('emailAddress');
const apiToken = configStore.get('apiToken');
const hostname = configStore.get('hostname');

// encode email and token for basic auth as per JIRA authentications
const encodeEmailToken = Buffer.from(`${emailAddress}:${apiToken}`).toString('base64')

const instance = axios.create({
    baseURL: `https://${hostname}`,
    headers: {
      'Authorization':  `Basic ${encodeEmailToken}`,
      'Cache-Control': 'no-cache',
      'Content-Type': "application/json"
    },  
})


instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

module.exports = instance