define((require) => {
    var action = require("./login/");
    var main = require("./main");
    return {
      action,
      main,
    };
  });
  