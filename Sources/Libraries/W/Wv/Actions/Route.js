import { RouteObserver } from '../Observer/RouteObserver.js'
import { StoreObserver } from '../Observer/StoreObserver.js'

const Notify = () => {
  StoreObserver.Clear()
  RouteObserver.Notify()
}
const Push = (path) => {
  StoreObserver.Clear()
  window.location.hash = path
  // RouteObserver.Notify()
}
let Type = 'Hash'
const Path = () => {
  if (Type == 'Hash') return location.hash.slice(1)
  return null
}
// const State = {
//   // Type: 'Hash',
//   Path: () => {
//     console.log('masuk sini ga')
//     if (this.Type == 'Hash') return location.hash.slice(1)
//     return null
//   },
// }
export var Route = {
  Notify,
  Path,
  Push,
  Type,
}
