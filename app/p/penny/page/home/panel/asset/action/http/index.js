define((require) => {
  var assetType = require('./assetType/index')
  var createOneMe = require('./createOneMe')
  var readManyMe = require('./readManyMe')
  return { assetType, createOneMe, readManyMe }
})
