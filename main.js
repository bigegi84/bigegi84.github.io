define((require) => {
  var bigegi84 = require("./bigegi84/index");
  var { action, state, store } = bigegi84;
  var app = require("./app/index");
  action.init.all();
  var dom = (parent, children) => {
    parent.innerHTML = "";
    children().forEach((it) => parent.appendChild(it()));
  };
  var route = () => {
    document.getElementById("root").innerHTML = "";
    switch (window.location.hash) {
      case "#/":
        // dom(document.getElementById("root"), app.chordAdmin.main);
        break;
      case "#/chordAdmin":
        dom(document.getElementById("root"), app.chordAdmin.main);
        break;
      case "#/pakuanUi":
        dom(document.getElementById("root"), app.pakuanUi.view);
        break;
      default:
        // dom(document.getElementById("root"), app.chordAdmin.main);
        break;
    }
  };
  onhashchange = (event) => {
    route();
  };
  // state.observer.subscribe(() => {
  //   document.getElementById("root").innerHTML = "";
  //   route();
  // });
  route();
});
