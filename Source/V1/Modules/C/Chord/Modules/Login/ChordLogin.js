import { Wv } from '../../../../../../../Libraries/W/Wv/Wv.js'
import { Wh } from '../../../../../../../Libraries/W/Wh/Wh.js'
import { UrlState } from '../../../../../States/UrlState.js'
import { Wd } from '../../../../../../../Libraries/W/Wd/Wd.js'
import { Wc } from '../../../../../../../Libraries/W/Wc/Wc.js'

const username = Wv.UseStore('')
const password = Wv.UseStore('')
const LoginOk = (body) => {
  localStorage.setItem('chord_token', body.result)
  Wv.Route.Push('/chord')
}
const LoginHttp = async () => {
  const path = `/chord/user/login`
  const requestBody = {
    username: username.Value,
    password: password.Value,
  }
  const requestHash = await Wc.SHA256(requestBody)
  const cacheKey = `POST:${path}:${requestHash}`
  const cached = Wd.Cache.get(cacheKey)
  if (cached != null) {
    LoginOk(cached)
    return
  }
  const response = await Wh.Post(`${UrlState.Api}${path}`, requestBody)
  if (response.status == 400) alert('Bad Request.')
  const responseBody = await response.json()
  Wd.Cache.set(cacheKey, responseBody)
  LoginOk(responseBody)
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
    Wv.Button('Login', () => LoginHttp()),
  ])
}
