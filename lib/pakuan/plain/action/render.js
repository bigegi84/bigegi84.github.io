define((require) => {
  // var { theme } = require("../../../../bigegi84/store/index");
  var {
    button,
    buttonCircle,
    card,
    column,
    inputLabelPassword,
    inputLabelText,
    inputLabelTextarea,
    observer,
    panel: { panel, panelHide },
    row,
    text,
    textHighlight,
    textStrong,
  } = require("../view/index");
  var main = (obj) => {
    var component = [];
    // console.log(obj);
    for (var key in obj) {
      // console.log(key);
      var found = false;
      if (!found && key.includes("buttonCircle")) {
        found = true;
        component.push(buttonCircle(key.replace("buttonCircle", "")));
      }
      if (!found && key.includes("button")) {
        found = true;
        component.push(button(key.replace("button", ""), obj[key]));
      }
      if (!found && key.includes("card")) {
        found = true;
        component.push(card(main(obj[key])));
      }
      if (!found && key.includes("columnList")) {
        found = true;
        component.push(column(obj[key]));
      }
      if (!found && key.includes("column")) {
        found = true;
        component.push(column(main(obj[key])));
      }
      if (!found && key.includes("inputLabelPassword")) {
        found = true;
        component.push(
          inputLabelPassword(key.replace("inputLabelPassword", ""), obj[key])
        );
      }
      if (!found && key.includes("inputLabelTextarea")) {
        found = true;
        component.push(
          inputLabelTextarea(key.replace("inputLabelTextarea", ""), obj[key])
        );
      }
      if (!found && key.includes("inputLabelText")) {
        found = true;
        component.push(
          inputLabelText(key.replace("inputLabelText", ""), obj[key])
        );
      }
      if (!found && key.includes("observer")) {
        found = true;
        component.push(observer(obj[key]));
      }
      if (!found && key.includes("panelHide")) {
        found = true;
        component.push(panelHide(key.replace("panelHide", ""), main(obj[key])));
      }
      if (!found && key.includes("panel")) {
        found = true;
        component.push(panel(key.replace("panel", ""), main(obj[key])));
      }
      if (!found && key.includes("row")) {
        found = true;
        component.push(row(main(obj[key])));
      }
      if (!found && key.includes("textHighlight")) {
        found = true;
        component.push(textHighlight(obj[key]));
      }
      if (!found && key.includes("textStrong")) {
        found = true;
        component.push(textStrong(obj[key]));
      }
      if (!found && key.includes("text")) {
        found = true;
        component.push(text(obj[key]));
      }
      if (!found && key.includes("view")) {
        found = true;
        component.push(column(obj[key]));
      }
    }
    return component;
  };
  return main;
});
