define((require) => {
  var calculator = require('./calculator/index')
  var chordAdmin = require('./chordAdmin/index')
  return {
    calculator,
    chordAdmin,
  }
})
