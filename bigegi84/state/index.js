define((require) => {
  var Observer = require("../lib/observer");
  return {
    css: {
      alertify: {
        main: "lib/alertifyjs/css/alertify.min.css",
        theme: "lib/alertifyjs/css/themes/default.min.css",
      },
      template: {
        fontAwesomeAll: "asset/css/font-awesome-all-6.4.0.css",
        main: "template/story/assets/css/main.css",
      },
      bigegi84: "bigegi84/lib//css/bigegi84.css",
    },
    observer: Observer(),
  };
});
