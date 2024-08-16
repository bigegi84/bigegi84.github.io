define((require) => {
  var createOneMe = require('./createOneMe')
  var readManyMe = require('./readManyMe')
  return { createOneMe, readManyMe }
})
