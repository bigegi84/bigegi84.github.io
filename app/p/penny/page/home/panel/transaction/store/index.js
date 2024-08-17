define((require) => {
  var { action } = require('../../../../../../../../lib/pakuan/index')
  return action.useStore({
    data: [],
    form: {
      account_id: '',
      type_name: '',
      amount: 0,
    },
    search: '',
  })
})
