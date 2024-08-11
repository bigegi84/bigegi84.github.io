define((require) => {
  var labelV = require("./label");
  var inputPassword = require("./inputPassword");
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
        inputPassword(label, state, inputCls),
      ])();
    };
  };
});
