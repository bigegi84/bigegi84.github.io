define((require) => {
  var { pakuan } = require("../../../lib/index");
  return pakuan.action.useStore({
    count: 0,
  });
});
