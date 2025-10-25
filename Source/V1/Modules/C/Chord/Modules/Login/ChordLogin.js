import { Wv } from '../../../../../../../Libraries/W/Wv/Wv.js'
import { Wh } from '../../../../../../../Libraries/W/Wh/Wh.js'
import { UrlState } from '../../../../../States/UrlState.js'

const username = Wv.UseStore('')
const password = Wv.UseStore('')
const LoginAction = async () => {
  const response = await Wh.Post(`${UrlState.Api}/chord/user/login`, {
    username: username.Value,
    password: password.Value,
  })
  if (response.status == 400) alert('Bad Request.')
  const body = await response.json()
  localStorage.setItem('chord_token', body.result)
  Wv.Route.Push('/chord')
}
export const ChordLogin = () => {
  return Wv.Row([
    Wv.Effect(() =>
      Wv.IText(username.Value, (e) => {
        username.Value = e.target.value
      })
    ),
    Wv.Effect(() =>
      Wv.IText(password.Value, (e) => {
        password.Value = e.target.value
      })
    ),
    Wv.Button('Login', () => LoginAction()),
  ])
}
