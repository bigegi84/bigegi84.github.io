import { Wv } from '../../Libraries/W/Wv/Wv.js'
import { ChordRoute } from '../Modules/C/Chord/Routes/ChordRoute.js'
import { Home } from '../Modules/H/Home/Home.js'

export const Route = (parent) => {
  const path = Wv.Route.Path()
  // if (path.startsWith('/chord')) return ChordRoute(path)(parent)
  // return Home()(parent)
  // console.log('chordRoute', ChordRoute(path))
  if (path.startsWith('/chord'))
    return ChordRoute(path).forEach((it) => it(parent))
  return Home().forEach((it) => it(parent))
  // console.log(Home())
  return Home()
}
