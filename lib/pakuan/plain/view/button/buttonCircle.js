define((require) => {
  var button = require('./buttonRegular')
  return (label, onClick = null) => {
    return button(label, onClick, 'pakuan-buttonCircle')
  }
})
