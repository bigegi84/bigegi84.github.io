define((require) => {
  var div = require("./div");
  var icon = require("./icon");
  var row = require("./row");
  var textStrong = require("./textStrong");
  var useState = require("./useState");
  return (label = null, lCls = null) => {
    return (parent) => {
      var isShow = useState(false);

      // var list = [];
      // if (label) {
      //   list.push(textStrong(label, lCls));
      // }
      var render = () => {
        row([
          label ? textStrong(label, lCls) : null,
          div([icon(isShow ? "fas fa-angle-up" : "fas fa-angle-down")]),
        ])(parent);
      };
      isShow.onChange = () => {
        render();
      };
      render();
    };
  };
});
