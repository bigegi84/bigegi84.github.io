define((require) => {
  var buttonCircle = require('./buttonCircle')
  var buttonRegular = require('./buttonRegular')
  return {
    button: buttonRegular,
    buttonCircle,
    buttonRegular,
  }
})
