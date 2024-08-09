define((require) => {
  var labelV = require("./label");
  var inputText = require("./inputText");
  var column = require("./column");
  return (label = null, state = null, labelCls = null, inputCls = null) => {
    return () => {
      return column([
        labelV(label, labelCls),
        inputText(label, state, inputCls),
      ])();
    };
  };
});
