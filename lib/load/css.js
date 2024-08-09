define((require) => {
  var cssOne = require("./cssOne");
  var main = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object") main(obj[key]);
        else cssOne(obj[key]);
      }
    }
  };
  return main;
});
