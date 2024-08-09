define((require) => {
  var button = require("./button");
  var column = require("./column");
  var div = require("./div");
  var icon = require("./icon");
  var row = require("./row");
  var textStrong = require("./textStrong");
  var useState = require("./useState");
  return (label = null, isShowP = null, lCls = "pakuan-textStrong") => {
    return () => {
      var isShow = isShowP ? isShowP : useState(false);
      var child = () =>
        row([
          label ? textStrong(label, lCls) : null,
          div([
            button(isShow.value ? "<" : ">", () => {
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
