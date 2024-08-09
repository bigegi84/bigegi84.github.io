define((require) => {
  var button = require("./button");
  var buttonCircle = require("./buttonCircle");
  var card = require("./card");
  var column = require("./column");
  var inputLabelText = require("./inputLabelText");
  var inputLabelTextarea = require("./inputLabelTextarea");
  var observer = require("./observer");
  var panel = require("./panel");
  var row = require("./row");
  var text = require("./text");
  var textHighlight = require("./textHighlight");
  var textStrong = require("./textStrong");
  return {
    button,
    buttonCircle,
    card,
    column,
    inputLabelText,
    inputLabelTextarea,
    observer,
    panel,
    row,
    text,
    textStrong,
    textHighlight,
  };
});
