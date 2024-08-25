define((require) => {
  var state = require('../../state/index')
  var store = require('../../store/index')
  return async () => {
    try {
      const res = await axios.post(
        state.apiUrl + '/asset/readManyMe',
        {
          per_page: 1000,
          column: {
            type_id: store.filter.column.type_id,
          },
          search: store.filter.search,
        },
        {
          headers: {
            'jwt-token': state.apiToken,
          },
        }
      )
      if (res.data.status == 'ok') {
        store.data = res.data.result.data
      }
    } catch (e) {}
  }
})
