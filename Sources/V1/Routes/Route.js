import { Router } from '../../Libraries/W/Wv/Components/R/Router/Router.js'
import { Wv } from '../../Libraries/W/Wv/Wv.js'
import { ChordRoute } from '../Modules/C/Chord/Routes/ChordRoute.js'
import { Home } from '../Modules/H/Home/Home.js'

export const Route = (parent) => {
  const path = Wv.Route.Path()
  return Router({
    '/': Home(),
    ...ChordRoute(),
    '?': Home(),
  })
}
