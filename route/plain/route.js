define((require) => {
  var app = require("../../app/index");
  var bigegi84 = require("../../bigegi84/index");
  var dom = require("./dom");
  return () => {
    document.getElementById("root").innerHTML = "";
    switch (window.location.hash) {
      case "#/":
        dom(document.getElementById("root"), bigegi84.view);
        break;
      case "#/chordAdmin":
        dom(document.getElementById("root"), app.c.chordAdmin.main);
        break;
      case "#/pakuanUi":
        dom(document.getElementById("root"), app.pakuanUi.view);
        break;
      default:
        dom(document.getElementById("root"), bigegi84.view);
        break;
    }
  };
});
