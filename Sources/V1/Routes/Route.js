import { Wv } from '../../Libraries/W/Wv/Wv.js'
import { ChordRoute } from '../Modules/C/Chord/Routes/ChordRoute.js'
import { Home } from '../Modules/H/Home/Home.js'

export const Route = () => {
  const path = Wv.Route.Path()
  console.log('path', path)
  if (path.startsWith('/chord')) return ChordRoute(path)
  return Home()
}
