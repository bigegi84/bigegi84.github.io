import { Wv } from '../../../../../../../Libraries/W/Wv/Wv.js'

export const ChordAdmin = () => {
  if (localStorage.getItem('chord_token') == null) Wv.Route.Push('/Chord/Login')
  return Wv.Button('ini admin, logout', () => {
    localStorage.removeItem('chord_token')
    Wv.Route.Notify()
  })
}
