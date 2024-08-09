define((require) => {
  var login = require("./login/index");
  var song = require("./song/index");
  return {
    login,
    song,
  };
});
