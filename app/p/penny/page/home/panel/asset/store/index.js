define((require) => {
  var { action } = require('../../../../../../../../lib/pakuan/index')
  return action.useStore({
    data: [],
    form: {
      name: '',
      type_name: '',
      balance: 0,
    },
    search: '',
  })
})
