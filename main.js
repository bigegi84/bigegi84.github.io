define((require) => {
  var bigegi84 = require("./bigegi84/index");
  var { action, state, store } = bigegi84;
  var app = require("./app/index");
  action.init.all();
  var route = () => {
    document.getElementById("root").innerHTML = "";
    switch (window.location.hash) {
      case "#/":
        bigegi84.action.render();
        break;
      case "#/chordAdmin":
        app.chordAdmin.main();
        break;
      default:
        bigegi84.action.render();
        break;
    }
  };
  onhashchange = (event) => {
    route();
    console.log(event);
  };
  state.observer.subscribe(() => {
    document.getElementById("root").innerHTML = "";
    route();
  });
  route();
});