define((require) => {
  var createOne = require("./createOne");
  var readMany = require("./readMany");
  return {
    createOne,
    readMany,
  };
});
