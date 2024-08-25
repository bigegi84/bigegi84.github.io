define((require) => {
  var readManyMe = require('./readManyMe')
  var state = require('../../state/index')
  var store = require('../../store/index')
  return async () => {
    try {
      const res = await axios.post(
        state.apiUrl + '/asset/updateOneMe',
        {
          id: store.form.id,
          name: store.form.name,
          type_name: store.form.type_name,
          balance: store.form.balance,
          unit_name: store.form.unit_name,
        },
        {
          headers: {
            'jwt-token': state.apiToken,
          },
        }
      )
      if (res.data.status == 'ok') {
        store.form.id = 0
        store.form.name = ''
        store.form.type_name = ''
        store.form.balance = 0
        store.form.unit_name = 'IDR'
        readManyMe()
        alertify.success('Berhasil.')
      }
    } catch (e) {}
  }
})
