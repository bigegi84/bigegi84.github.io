define((require) => {
  const state = require('../../../../bigegi84/state/index')
  return {
    // apiUrl: "http://localhost:8000/api/chord",
    // apiUrl: "http://localhost:841/chord",
    ApiUrl: state.host + '/chord',
    set ApiToken(token) {
      if (token) localStorage.setItem('ChordAdmin_ApiToken', token)
      else localStorage.removeItem('ChordAdmin_ApiToken')
    },
    get ApiToken() {
      return localStorage.getItem('ChordAdmin_ApiToken')
    },
  }
})
