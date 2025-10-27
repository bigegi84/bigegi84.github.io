import { Wv } from "./Sources/Libraries/W/Wv/Wv.js"
import { Route } from "./Sources/V1/Routes/Route.js"

Wv.Dom(Route)
window.addEventListener('hashchange', () => {
  Wv.Route.Notify()
})
