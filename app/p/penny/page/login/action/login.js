define((require) => {
  var state = require('../../../state/index')
  var store = require('../../../store/index')
  return async () => {
    var { username, password } = store.loginForm
    const res = await axios.post(state.api + '/user/login', {
      username,
      password,
    })
    if (res.data.status == 'ok') {
      localStorage.setItem('penny_apiToken', res.data.result)
      alertify.success('Login berhasil.')
      window.location.hash = '/penny-'
      window.location.hash = '/penny'
    } else {
      alertify.error('Login gagal.')
    }
  }
})
