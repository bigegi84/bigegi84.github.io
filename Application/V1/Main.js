import { Wx } from './Libraries/W/Wx/Wx.js'
import { Route } from './Routes/Route.js'

Wx.Dom(Route)
window.addEventListener('hashchange', () => {
  Wx.Route.Notify()
})
