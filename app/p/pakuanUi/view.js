define((require) => {
  var { pakuan } = require('../../../lib/index')
  var app = require('../../../route/app')
  var store = require('./store')
  return () =>
    pakuan.main({
      textHighlight: 'bigegi84 - Pakuan UI',
      ...app,
      panelHideAlert: {
        buttonError: () => {
          alertify.error('Error.')
        },
        buttonNormal: () => {
          alertify.message('Normal.')
        },
        buttonSuccess: () => {
          alertify.success('Success.')
        },
        buttonWarning: () => {
          alertify.warning('Warning.')
        },
      },
      panelHideInput: {
        card: {
          inputLabelSelectSelect: {
            state: [
              'value',
              (e) => {
                console.log(e)
                console.log(e.target.value)
                alert('masuk')
              },
            ],
            option: [['key1'], ['key2', 'value2']],
          },
        },
      },
      panelHideLayout: {
        card: {
          panelHideCard: {
            card: {
              text: 'This is card.',
            },
          },
          panelHideColumn: {
            column: {
              cardA: {
                text: 'This is column 1.',
              },
              cardB: {
                text: 'This is column 2.',
              },
              cardC: {
                text: 'This is column 3.',
              },
            },
          },
          panelHideRow: {
            row: {
              cardA: {
                text: 'This is row 1.',
              },
              cardB: {
                text: 'This is row 2.',
              },
              cardC: {
                text: 'This is row 3.',
              },
            },
          },
        },
      },
      panelHideStore: {
        card: {
          observer: () => pakuan.main({ text: store.count }),
          buttonCount: () => {
            store.count = store.count + 1
          },
        },
      },
      panelHideText: {
        card: {
          panelHideText: {
            card: {
              text: 'This is "text".',
            },
          },
          'panelHideText Highlight': {
            card: {
              textHighlight: 'This is "textHighlight".',
            },
          },
          'panelHideText Strong': {
            card: {
              text: 'This is "textStrong".',
            },
          },
        },
      },
    })
})
