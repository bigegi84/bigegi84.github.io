define((require) => {
  var textHighlight = require('./textHighlight')
  var textRegular = require('./textRegular')
  var textStamp = require('./textStamp')
  var textStrong = require('./textStrong')
  return {
    textHighlight,
    textRegular,
    textStamp,
    textStrong,
  }
})
