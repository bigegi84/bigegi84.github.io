define((require) => {
  var state = require("../../state/index");
  return (view) => {
    return () => {
      const wrapper = document.createElement("div");
      state.observer.subscribe(() => {
        wrapper.innerHTML = "";
        wrapper.appendChild(view());
      });
      wrapper.appendChild(view());
    };
  };
});
