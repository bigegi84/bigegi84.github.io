define((require) => {
  var button = require('./button/index')
  var card = require('./card/index')
  var input = require('./input/index')
  var layout = require('./layout/index')
  var observer = require('./observer')
  var observerRow = require('./observerRow')
  var panel = require('./panel/index')
  var text = require('./text/index')
  var useState = require('./useState')
  return {
    button,
    card,
    input,
    layout,
    observer,
    observerRow,
    panel,
    text,
    useState,
  }
})
