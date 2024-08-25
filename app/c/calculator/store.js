define((require) => {
  var { action } = require('../../../lib/pakuan/index')
  return action.useStore({
    accounting: {
      result: 0,
    },
  })
})
