import { Button } from '../../../../../Libraries/W/Wx/Components/B/Button/Button.js'
import { Effect } from '../../../../../Libraries/W/Wx/Components/E/Effect/Effect.js'
import { InputText } from '../../../../../Libraries/W/Wx/Components/I/Input/InputText.js'
import { LayoutLinear } from '../../../../../Libraries/W/Wx/Components/L/Layout/LayoutLinear.js'
import { Wx } from '../../../../../Libraries/W/Wx/Wx.js'
import { UrlState } from '../../../../../States/UrlState.js'

const username = Wx.UseStore('')
const password = Wx.UseStore('')
const httpLogin = async () => {
  const response = await Wx.Post(`${UrlState.Api}/chord/user/login`, {
    username: username.Value,
    password: password.Value,
  })
  if (response.status == 400) alert('Bad Request.')
  const body = await response.json()
  localStorage.setItem('chord_token', body.result)
  Wx.Route.Push('/Chord')
}
export const ChordLogin = () => {
  return LayoutLinear([
    Effect(() =>
      InputText(username.Value, (e) => {
        username.Value = e.target.value
      })
    ),
    Effect(() =>
      InputText(password.Value, (e) => {
        password.Value = e.target.value
      })
    ),
    Button('Login', () => httpLogin()),
  ])
}
