define((require) => {
  var assetType = require('./assetType/index')
  var createOneMe = require('./createOneMe')
  var readManyMe = require('./readManyMe')
  var updateOneMe = require('./updateOneMe')
  return { assetType, createOneMe, readManyMe, updateOneMe }
})
