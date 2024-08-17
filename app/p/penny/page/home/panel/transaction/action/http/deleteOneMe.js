define((require) => {
  var readManyMe = require('./readManyMe')
  var state = require('../../state/index')
  return async (id) => {
    try {
      const res = await axios.post(
        state.apiUrl + '/transaction/deleteOneMe',
        {
          id,
        },
        {
          headers: {
            'jwt-token': state.apiToken,
          },
        }
      )
      if (res.data.status == 'ok') {
        readManyMe()
        alertify.success('Success.')
      }
    } catch (e) {}
  }
})
