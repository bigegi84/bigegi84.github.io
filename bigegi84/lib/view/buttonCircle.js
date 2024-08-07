define((require) => {
  var button = require("./button");
  var column = require("./column");
  var div = require("./div");
  var icon = require("./icon");
  var row = require("./row");
  var textStrong = require("./textStrong");
  var useState = require("./useState");
  return (label = null, lCls = null) => {
    return () => {
      var isShow = useState(false);
      var child = () =>
        row([
          label ? textStrong(label, lCls) : null,
          div([
            button(isShow.value ? "v" : "^", () => {
              isShow.value = !isShow.value;
            }),
          ]),
        ]);
      var component = column([child()])();
      isShow.observer.subscribe(() => {
        component.innerHTML = "";
        component.appendChild(child()());
      });
      return component;
    };
  };
});
