define((require) => {
  var { theme } = require("../../../store/index");
  var { button, column, text } = require("../../../lib/view/index");
  var main = (obj) => {
    var component = [];
    for (var key in obj) {
      var found = false;
      if (!found && key.includes("button")) {
        found = true;
        component.push(
          button(key.replace("button", ""), obj[key], theme.className.button)
        );
      }
      if (!found && key.includes("column")) {
        found = true;
        component.push(column(main(obj[key]), theme.className.column));
      }
      if (!found && key.includes("text")) {
        found = true;
        component.push(text(obj[key], theme.className.text));
      }
    }
    return column(component, theme.className.column);
  };
  return main;
});
