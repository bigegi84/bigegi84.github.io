import { RouteObserver } from '../Observer/RouteObserver.js'
import { Wv } from '../Wv.js'

const Run = (parent, child) => {
  parent.innerHTML = ''
  child(parent)
}
window.addEventListener('hashchange', () => {
  Wv.Route.Notify()
})
export var Dom = (child, parent = document.getElementById('Main')) => {
  const isFunction = typeof child == 'function'
  if (!isFunction) throw Error('Dom child is not a function.')
  const render = () => Run(parent, child)
  render()
  RouteObserver.Subscribe(() => {
    render()
  })
}
