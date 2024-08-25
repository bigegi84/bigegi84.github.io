define((require) => {
  var { action } = require('../../../../../../../../lib/pakuan/index')
  return action.useStore({
    data: [],
    form: {
      asset_id: '',
      type_name: '',
      amount: 0,
    },
    search: '',
  })
})
