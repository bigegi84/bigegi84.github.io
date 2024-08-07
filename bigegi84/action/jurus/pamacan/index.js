define((require) => {
  var { theme } = require("../../../store/index");
  var { button, column, text } = require("../../../lib/view/index");
  return (obj) => {
    var component = [];
    var i = 0;
    for (var key in obj) {
      var found = false;
      if (!found && key.includes("button")) {
        found = true;
        component.push(
          button(key.replace("button", ""), obj[key], theme.className.button)
        );
      }
      if (!found && key.includes("text")) {
        found = true;
        component.push(text(key.replace("text", obj[key])));
      }
    }
    return column(component);
  };
});
