define((require) => {
  var bigegi84 = require("./bigegi84/index");
  var { action, state, store } = bigegi84;
  action.init.all();
  onhashchange = (event) => {
    switch (window.location.hash) {
      case "#/":
        bigegi84.action.render();
        break;
      case "#/chordAdmin":
        // code block
        break;
      default:
        bigegi84.action.render();
        break;
    }
  };
  state.observer.subscribe(() => {
    document.getElementById("root").innerHTML = "";
    bigegi84.action.render();
  });
  bigegi84.action.render();
});
