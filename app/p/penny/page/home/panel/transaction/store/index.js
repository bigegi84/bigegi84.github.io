define((require) => {
  var { action } = require('../../../../../../../../lib/pakuan/index')
  return action.useStore({
    data: [
      {
        name: 'BNI 1248908',
        balance: 0,
        type: {
          name: 'Debit',
        },
      },
    ],
    form: {
      account_id: '',
      type_name: '',
      ammount: 0,
    },
    search: '',
  })
})
