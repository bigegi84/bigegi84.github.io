define((require) => {
  var home = require("./home/index");
  var login = require("./login/index");
  return {
    home,
    login,
  };
});
