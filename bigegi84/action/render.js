define((require) => {
  var jurus = require("./jurus/index");
  var store = require("../store/index");
  return () => {
    jurus.pamacan({
      text: store.count,
      buttonCount: () => {
        store.count++;
      },
    })(document.getElementById("root"));
  };
});
