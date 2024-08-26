define((require) => {
  var buttonCircle = require('./buttonCircle')
  var buttonLabelCircle = require('./buttonLabelCircle')
  var buttonRegular = require('./buttonRegular')
  return {
    button: buttonRegular,
    buttonLabelCircle,
    buttonCircle,
    buttonRegular,
  }
})
