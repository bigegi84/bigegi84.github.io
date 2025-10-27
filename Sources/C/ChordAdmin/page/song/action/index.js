define((require) => {
  var emptyForm = require("./emptyForm");
  var http = require("./http/index");
  var logout = require("./logout");
  var validate = require("./validate");
  return {
    emptyForm,
    http,
    logout,
    validate,
  };
});
