define((require) => {
  var panelHide = require('./panelHide')
  var panelShow = require('./panelShow')
  return {
    panel: panelHide,
    panelHide,
    panelShow,
  }
})
