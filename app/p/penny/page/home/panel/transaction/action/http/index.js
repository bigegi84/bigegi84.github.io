define((require) => {
  var createOneMe = require('./createOneMe')
  var deleteOneMe = require('./deleteOneMe')
  var readManyMe = require('./readManyMe')
  return { createOneMe, deleteOneMe, readManyMe }
})
