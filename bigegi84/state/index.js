define((require) => {
  var Observer = require("../../lib/observer");
  return {
    css: {
      alertify: {
        main: "vendor/alertifyjs/css/alertify.min.css",
        theme: "vendor/alertifyjs/css/themes/default.min.css",
      },
      template: {
        // fontAwesomeAll: "asset/css/font-awesome-all-6.4.0.css",
        // main: "template/story/assets/css/main.css",
      },
      bigegi84: "bigegi84/asset/css/bigegi84.css",
      root: "asset/css/main.css",
    },
    observer: Observer(),
  };
});
