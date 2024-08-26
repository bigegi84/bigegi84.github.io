define((require) => {
  var { pakuan } = require('../../../lib/index')
  var app = require('../../../route/app')
  var store = require('./store')
  return pakuan.main({
    textHighlight: 'bigegi84 - Pakuan',
    ...app,
    panelHideAlert: {
      cardRow: {
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
    },
    panelButton: {
      card: {
        panelRegular: {
          card: {
            buttonRegular: () => alertify.success('Button Regular clicked.'),
          },
        },
      },
    },
    panelHideInput: {
      card: {
        'panelLabel Select': {
          card: {
            inputLabelSelectSelect: {
              state: [
                '',
                (e) => {
                  alertify.success(`value: '${e.target.value}' selected.`)
                },
              ],
              option: [
                ['key1', 'value1'],
                ['key2', 'value2'],
              ],
            },
          },
        },
        'panelLabel Text': {
          card: {
            inputLabelTextText: [],
          },
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
