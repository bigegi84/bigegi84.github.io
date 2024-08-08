define((require) => {
  var state = require("../../state/index");
  return (view) => {
    return () => {
      const component = document.createElement("div");
      state.observer.subscribe(() => {
        component.innerHTML = "";
        component.appendChild(view()());
      });
      component.appendChild(view()());
      return component;
    };
  };
});
