define((require) => {
  var http = require('./http/index')
  var validate = require('./validate')
  return {
    http,
    validate,
  }
})
