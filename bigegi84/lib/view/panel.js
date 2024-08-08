define((require) => {
  var buttonCircle = require("./buttonCircle");
  var column = require("./column");
  var row = require("./row");
  var observer = require("./observer");
  var useState = require("./useState");
  return (label = "", children) => {
    return () => {
      var isShow = useState(false);
      var component = column([
        buttonCircle(label, isShow),
        isShow.observerView(() => (isShow.value ? row([children]) : row([]))),
      ])();
      return component;
    };
  };
});
