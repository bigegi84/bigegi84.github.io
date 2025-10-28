import { Wv } from '../../../../../../Libraries/W/Wv/Wv.js'
import { Navigation } from '../../../../../Components/Navigation.js'
import { ChordLayout } from '../../Components/ChordLayout.js'

export const ChordAdmin = () => {
  if (localStorage.getItem('chord_token') == null) Wv.Route.Push('/chord/login')
  return ChordLayout({
    Text: 'ini admin',
    'ButtonLog out': () => {
      localStorage.removeItem('chord_token')
      Wv.Route.Notify()
    },
  })
}
