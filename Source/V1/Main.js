import { Wv } from '../../Libraries/W/Wv/Wv.js'
import { Route } from './Routes/Route.js'

Wv.Dom(Route)
window.addEventListener('hashchange', () => {
  Wv.Route.Notify()
})
