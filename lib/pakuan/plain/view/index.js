define((require) => {
  var button = require('./button')
  var buttonCircle = require('./buttonCircle')
  var card = require('./card')
  var column = require('./column')
  var input = require('./input/index')
  var inputLabelNumber = require('./inputLabelNumber')
  var inputLabelPassword = require('./inputLabelPassword')
  var inputLabelText = require('./inputLabelText')
  var inputLabelTextarea = require('./inputLabelTextarea')
  var observer = require('./observer')
  var observerRow = require('./observerRow')
  var panel = require('./panel/index')
  var row = require('./row')
  var text = require('./text/index')
  var textHighlight = require('./textHighlight')
  var textStrong = require('./textStrong')
  return {
    button,
    buttonCircle,
    card,
    column,
    input,
    inputLabelNumber,
    inputLabelPassword,
    inputLabelText,
    inputLabelTextarea,
    observer,
    observerRow,
    panel,
    row,
    text,
    textStrong,
    textHighlight,
  }
})
