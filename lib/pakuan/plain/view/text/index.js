define((require) => {
  var textHighlight = require('./textHighlight')
  var textRegular = require('./textRegular')
  var textResult = require('./textResult')
  var textStamp = require('./textStamp')
  var textStrong = require('./textStrong')
  return {
    textHighlight,
    textRegular,
    textResult,
    textStamp,
    textStrong,
  }
})
