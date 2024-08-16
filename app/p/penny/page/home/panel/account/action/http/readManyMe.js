define((require) => {
  var state = require('../../state/index')
  var store = require('../../store/index')
  return async () => {
    try {
      const res = await axios.post(state.apiUrl + '/account/readManyMe', null, {
        headers: {
          'jwt-token': state.apiToken,
        },
        params: {
          per_page: 1000,
          title: store.search,
        },
      })
      if (res.data.status == 'ok') {
        store.data = res.data.result.data
      }
    } catch (e) {}
  }
})
