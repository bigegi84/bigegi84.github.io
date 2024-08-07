define((require) => {
  var bigegi84 = require("../../../bigegi84/index");
  var jurus = bigegi84.action.jurus;
  return () => {
    jurus.pamacan({
      text: "ini halaman chord Admin",
      textA: "haha",
      buttonCount: () => {
        store.count++;
      },
    })(document.getElementById("root"));
  };
});
