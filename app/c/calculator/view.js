define((require) => {
  var { pakuan } = require('../../../lib/index')
  var store = require('./store')
  var state = {
    accounting: {
      current: 0,
      data: 0,
    },
  }
  return pakuan.main({
    textHighlight: 'bigegi84 - Calculator',
    panelHideAccounting: {
      card: {
        row: {
          inputLabelNumberCurrent: [
            state.accounting.current,
            (e) => (state.accounting.current = e.target.value),
          ],
          inputLabelNumberData: [
            state.accounting.data,
            (e) => (state.accounting.data = e.target.value),
          ],
          observer: () =>
            pakuan.main({
              text: store.accounting.result,
            }),
        },
        buttonCalculate: () => {
          store.accounting.result =
            state.accounting.current - state.accounting.data
        },
      },
    },
  })
})
