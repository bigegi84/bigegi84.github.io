define((require) => {
  var button = require('./button/index')
  var card = require('./card/index')
  var column = require('./layout/column')
  var input = require('./input/index')
  var observer = require('./observer')
  var observerRow = require('./observerRow')
  var panel = require('./panel/index')
  var row = require('./row')
  var text = require('./text/index')
  var textHighlight = require('./textHighlight')
  var textStrong = require('./textStrong')
  var useState = require('./useState')
  return {
    button,
    card,
    column,
    input,
    observer,
    observerRow,
    panel,
    row,
    text,
    textStrong,
    textHighlight,
    useState,
  }
})
