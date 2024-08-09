define((require) => {
  var state = require("../../../state/index");
  return (children) => {
    return () => {
      const component = document.createElement("div");
      var renderArray = (arr) => {
        arr.forEach((it) => {
          if (typeof it === "function") component.appendChild(it());
        });
      };
      var render = (props) => {
        props().forEach((it) => {
          if (typeof it === "function") component.appendChild(it());
          if (it.constructor === Array) renderArray(it);
        });
      };
      state.observer.subscribe(() => {
        component.innerHTML = "";
        render(children);
      });
      render(children);
      return component;
    };
  };
});