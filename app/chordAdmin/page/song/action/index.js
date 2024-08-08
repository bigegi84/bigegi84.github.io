define((require) => {
  var http = require("./http/index");
  var logout = require("./logout");
  return {
    http,
    logout,
  };
});
