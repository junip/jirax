const url = require('../Url');
const issue = require('../api/IssueApis');

module.exports = {
    openTask: key => {
        let issueUrl = url.issueURL(key);
        url.openURL(issueUrl);
    },

    assignToSelf: key => {
        issue.assignSelf(key)
    }
};
