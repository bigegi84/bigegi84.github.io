define((_require) => {
  var State = _require('../../../State/Index')
  var store = _require('../../../store/index')
  return async () => {
    var { username, password } = store.loginForm
    const res = await axios.post(State.ApiUrl + '/user/login', {
      username,
      password,
    })
    if (res.data.status == 'ok') {
      State.ApiToken = res.data.result
      alertify.success('Login berhasil.')
      window.location.hash = '/ChordAdmin/Home'
    } else {
      alertify.error('Login gagal.')
    }
  }
})
