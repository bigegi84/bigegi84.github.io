define((require) => {
  var { observer } = require("../observer");
  return (initial = null) => {
    var _value = initial;
    var _observer = observer();
    return {
      get value() {
        _value;
      },
      set value(v) {
        _value = v;
        _observer.notify();
      },
      onChange: (callback) => {
        _observer.subscribe(() => {
          if (callback) callback();
        });
      },
    };
  };
});
