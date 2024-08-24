define((require) => {
  var asset = require('./asset/index')
  var transaction = require('./transaction/index')
  return { asset, transaction }
})
