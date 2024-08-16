define((require) => {
  var { pakuan } = require('../../../../../lib/index')
  var app = require('../../../../../route/app')
  var panel = require('./panel/index')
  var state = require('../../state/index')
  var store = require('../../store/index')
  return () =>
    pakuan.main({
      ...app,
      panelHidePenny: {
        'buttonLog Out': () => {
          state.apiToken = null
          window.location.hash = '/penny-'
          window.location.hash = '/penny'
          alertify.success('Logout Success.')
        },
      },
      ...panel.account.view,
      panelHideGroup: {
        buttonError: () => alertify.error('Error.'),
      },
      panelHideFriend: {
        buttonError: () => alertify.error('Error.'),
      },
      panelHideTransaction: {
        buttonError: () => alertify.error('Error.'),
      },
    })
})
