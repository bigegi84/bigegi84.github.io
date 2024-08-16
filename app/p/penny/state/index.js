define((require) => {
  const bigegi84 = require('../../../../bigegi84/index')
  return {
    // apiUrl: "http://localhost:8000/api/chord",
    // apiUrl: "http://localhost:841/chord",
    apiUrlMain: bigegi84.state.host + '/main',
    apiUrl: bigegi84.state.host + '/penny',
    get apiToken() {
      return localStorage.getItem('penny_apiToken')
    },
    set apiToken(v) {
      if (v) localStorage.setItem('penny_apiToken', v)
      else localStorage.removeItem('penny_apiToken')
    },
  }
})
