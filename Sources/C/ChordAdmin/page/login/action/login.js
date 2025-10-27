define((require) => {
  var state = require('../../../state/index')
  var store = require('../../../store/index')
  return async () => {
    var { username, password } = store.loginForm
    const res = await axios.post(state.apiUrl + '/user/login', {
      username,
      password,
    })
    if (res.data.status == 'ok') {
      localStorage.setItem('chordAdmin-apiToken', res.data.result)
      alertify.success('Login berhasil.')
      window.location.hash = '/ChordAdmin/Home'
    } else {
      alertify.error('Login gagal.')
    }
  }
})
