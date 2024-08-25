define((require) => {
  var readManyMe = require('./readManyMe')
  var state = require('../../state/index')
  var store = require('../../store/index')
  return async () => {
    try {
      const res = await axios.post(
        state.apiUrl + '/transaction/createOneMe',
        {
          asset_id: store.form.asset_id,
          type_name: store.form.type_name,
          amount: store.form.amount,
        },
        {
          headers: {
            'jwt-token': state.apiToken,
          },
        }
      )
      if (res.data.status == 'ok') {
        store.form.asset_id = ''
        store.form.type_name = ''
        store.form.amount = 0
        readManyMe()
        alertify.success('Success.')
      }
    } catch (e) {}
  }
})
