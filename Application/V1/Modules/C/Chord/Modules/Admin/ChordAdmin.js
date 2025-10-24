import { Button } from '../../../../../Libraries/W/Wx/Components/B/Button/Button.js'
import { Wx } from '../../../../../Libraries/W/Wx/Wx.js'

export const ChordAdmin = () => {
  if (localStorage.getItem('chord_token') == null) Wx.Route.Push('/Chord/Login')
  return Button('ini admin, logout', () => {
    localStorage.removeItem('chord_token')
    Wx.Route.Notify()
  })
}
