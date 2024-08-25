define((require) => {
  var { action } = require('../../../../../../../../lib/pakuan/index')
  return action.useStore({
    assetType: {
      data: [],
    },
    data: [],
    filter: {
      column: {
        type_id: '',
      },
      search: '',
    },
    form: {
      name: '',
      type_name: '',
      balance: 0,
      unit_name: 'IDR',
    },
  })
})
