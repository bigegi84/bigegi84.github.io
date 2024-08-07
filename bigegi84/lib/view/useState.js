define((require) => {
  var Observer = require("../observer");
  return (initial = null) => {
    var _value = initial;
    var _observer = Observer();
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
