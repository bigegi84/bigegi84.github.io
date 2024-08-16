define((require) => {
  var readManyMe = require('./readManyMe')
  var state = require('../../state/index')
  var store = require('../../store/index')
  return async () => {
    try {
      const res = await axios.post(
        state.apiUrl + '/account/createOneMe',
        {
          name: store.form.name,
          type_name: store.form.type_name,
          balance: store.form.balance,
        },
        {
          headers: {
            'jwt-token': state.apiToken,
          },
        }
      )
      if (res.data.status == 'ok') {
        store.form.name = ''
        store.form.type_name = ''
        store.form.balance = 0
        readManyMe()
        alertify.success('Berhasil.')
      }
    } catch (e) {}
  }
})
