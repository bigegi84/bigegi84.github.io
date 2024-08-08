define((require) => {
  var { theme } = require("../../../store/index");
  var {
    button,
    buttonCircle,
    column,
    inputLabelText,
    observer,
    panel,
    text,
    textHighlight,
    textStrong,
  } = require("../../../lib/view/index");
  var main = (obj) => {
    var component = [];
    for (var key in obj) {
      console.log(key);
      var found = false;
      if (!found && key.includes("buttonCircle")) {
        found = true;
        component.push(
          buttonCircle(key.replace("buttonCircle", ""), theme.className.basic)
        );
      }
      if (!found && key.includes("button")) {
        found = true;
        component.push(
          button(key.replace("button", ""), obj[key], theme.className.button)
        );
      }
      if (!found && key.includes("columnList")) {
        found = true;
        component.push(column(obj[key], theme.className.column));
      }
      if (!found && key.includes("column")) {
        found = true;
        component.push(column(main(obj[key]), theme.className.column));
      }
      if (!found && key.includes("inputLabelText")) {
        found = true;
        component.push(
          inputLabelText(
            key.replace("inputLabelText", ""),
            obj[key],
            theme.className.basic,
            theme.className.inputText
          )
        );
      }
      if (!found && key.includes("observer")) {
        found = true;
        component.push(observer(obj[key], theme.className.basic));
      }
      if (!found && key.includes("panel")) {
        found = true;
        component.push(panel(key.replace("panel", ""), obj[key]));
      }
      if (!found && key.includes("textHighlight")) {
        found = true;
        component.push(textHighlight(obj[key], theme.className.basic));
      }
      if (!found && key.includes("textStrong")) {
        found = true;
        component.push(textStrong(obj[key], theme.className.basic));
      }
      if (!found && key.includes("text")) {
        found = true;
        component.push(text(obj[key], theme.className.text));
      }
      if (!found && key.includes("view")) {
        found = true;
        component.push(obj[key]);
      }
    }
    return column(component, theme.className.column);
  };
  return main;
});
