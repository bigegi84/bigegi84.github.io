define((require) => {
  var emptyForm = require('./emptyForm')
  var http = require('./http/index')
  var LogoutAction = require('./LogoutAction')
  var validate = require('./validate')
  return {
    emptyForm,
    http,
    Logout: LogoutAction,
    validate,
  }
})
