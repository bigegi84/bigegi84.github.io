define((require) => {
  var labelV = require("./label");
  var inputTextarea = require("./inputTextarea");
  var column = require("./column");
  return (label = null, state = null, labelCls = null, inputCls = null) => {
    return () => {
      return column([
        labelV(label, labelCls),
        inputTextarea(label, state, inputCls),
      ])();
    };
  };
});
