define((require) => {
  var buttonCircle = require("../buttonCircle");
  var column = require("../column");
  var useState = require("../useState");
  return (label = "", children) => {
    return () => {
      var isShow = useState(false);
      var component = column([
        buttonCircle(label, isShow),
        isShow.observerView(() =>
          isShow.value ? column(children) : column([])
        ),
      ])();
      return component;
    };
  };
});
