define((require) => {
  var state = require("../../state/index");
  return (view) => {
    return (parent) => {
      const wrapper = document.createElement("div");
      state.observer.subscribe(() => {
        wrapper.innerHTML = "";
        view()(wrapper);
      });
      view()(wrapper);
      parent.appendChild(wrapper);
    };
  };
});
