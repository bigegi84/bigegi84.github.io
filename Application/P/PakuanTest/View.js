define((require) => {
  var { pakuan } = require('../../../lib/index')
  var app = require('../../../route/app')
  return pakuan.main({
    textHighlight: 'bigegi84 - Pakuan Test',
    ...app,
    panelHideText: {
      card: {
        panelHideHighlight: {
          card: {
            textHighlight: 'This is "textHighlight".',
          },
        },
        panelHideRegular: {
          card: {
            text: 'This is "text".',
          },
        },
        panelHideStrong: {
          card: {
            text: 'This is "textStrong".',
          },
        },
      },
    },
  })
})
