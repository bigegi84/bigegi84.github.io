import { Router } from '../../Libraries/W/Wv/Components/R/Router/Router.js'
import { ChordRoute } from '../Modules/C/Chord/Routes/ChordRoute.js'
import { Home } from '../Modules/H/Home/Home.js'

export const Route = () => {
  return Router({
    '/': Home(),
    ...ChordRoute(),
    '?': Home(),
  })
}
