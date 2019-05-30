const auth = require("../Authentication");
function test() {
  auth.currentUser().jql.getAutoCompleteData({}, function(error, success) {
    console.log("error" + error);
    console.log("success" + success);
  });
}

test();
