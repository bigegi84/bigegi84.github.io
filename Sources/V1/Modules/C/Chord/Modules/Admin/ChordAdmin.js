import { Wv } from '../../../../../../Libraries/W/Wv/Wv.js'

export const ChordAdmin = () => {
  if (localStorage.getItem('chord_token') == null) Wv.Route.Push('/chord/login')
  return Wv.Render({
    Text: 'ini admin',
    'Buttonini admin, logout': () => {
      localStorage.removeItem('chord_token')
      Wv.Route.Notify()
    },
  })
}
