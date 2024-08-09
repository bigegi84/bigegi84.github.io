define((require) => {
  var labelV = require("./label");
  var inputTextarea = require("./inputTextarea");
  var column = require("./column");
  return (
    label = null,
    state = null,
    labelCls = "pakuan-textStrong",
    inputCls = "pakuan-inputTextarea"
  ) => {
    return () => {
      return column([
        labelV(label, labelCls),
        inputTextarea(label, state, inputCls),
      ])();
    };
  };
});
