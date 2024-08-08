define((require) => {
  var Observer = require("../observer");
  return (initial = null) => {
    var _value = initial;
    var _observer = Observer();
    _observer.subscribe(() => {});
    return {
      get value() {
        return _value;
      },
      set value(v) {
        _value = v;
        _observer.notify();
      },
      get observer() {
        return _observer;
      },
      observerView: (view) => {
        return () => {
          const component = document.createElement("div");
          _observer.subscribe(() => {
            console.log("view", view());
            component.innerHTML = "";
            component.appendChild(view()());
          });
          component.appendChild(view()());
          return component;
        };
      },
      onChange: (callback) => {
        alert("a");
        _observer.subscribe(() => {
          alert("b");
          if (callback) callback();
        });
      },
    };
  };
});
