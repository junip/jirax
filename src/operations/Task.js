const url = require('../Url');

module.exports ={
    openTask: (key) => {
        let issueUrl = url.issueURL(key)
        url.openURL(issueUrl)
    }
}