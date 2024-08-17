define((require) => {
  var account = require('./account/index')
  var transaction = require('./transaction/index')
  return { account, transaction }
})
