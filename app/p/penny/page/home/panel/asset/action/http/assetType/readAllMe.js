define((require) => {
  var state = require('../../../state/index')
  var store = require('../../../store/index')
  return async () => {
    try {
      const res = await axios.post(
        state.apiUrl + '/assetType/readAllMe',
        null,
        {
          headers: {
            'jwt-token': state.apiToken,
          },
        }
      )
      if (res.data.status == 'ok') {
        store.assetType.data = res.data.result
      }
    } catch (e) {}
  }
})
