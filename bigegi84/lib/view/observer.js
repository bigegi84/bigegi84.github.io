define((require) => {
  var state = require("../../state/index");
  return (view) => {
    return () => {
      const component = document.createElement("div");
      state.observer.subscribe(() => {
        component.innerHTML = "";
        view().forEach((it) => component.appendChild(it()));
      });
      view().forEach((it) => component.appendChild(it()));
      return component;
    };
  };
});
