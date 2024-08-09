define((require) => {
  var labelV = require("./label");
  var inputText = require("./inputText");
  var column = require("./column");
  return (
    label = null,
    state = null,
    labelCls = "pakuan-textStrong",
    inputCls = "pakuan-inputText"
  ) => {
    return () => {
      return column([
        labelV(label, labelCls),
        inputText(label, state, inputCls),
      ])();
    };
  };
});
