define((require) => {
  var Observer = require("../../lib/observer");
  var host = {
    arenhost: "https://bigegi84.my.id/bigegi84-api-lumen/index.php",
    bigegi84_oa37f: "http://192.168.1.43:8080/bigegi84-api-lumen/index.php",
    localhost: "http://localhost:840/bigegi84-api-lumen/index.php",
  };
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
    // host: host.bigegi84_oa37f,
    host: host.arenhost,
    observer: Observer(),
  };
});
