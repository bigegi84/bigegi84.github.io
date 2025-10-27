import { RouteObserver } from '../Observer/RouteObserver.js'
import { StoreObserver } from '../Observer/StoreObserver.js'

const Notify = () => {
  StoreObserver.Clear()
  RouteObserver.Notify()
}
const Push = (path) => {
  window.location.hash = path
  StoreObserver.Clear()
  RouteObserver.Notify()
}
export var Route = {
  Notify,
  Push,
}
