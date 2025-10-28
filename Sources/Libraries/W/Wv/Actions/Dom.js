import { RouteObserver } from '../Observer/RouteObserver.js'
import { Wv } from '../Wv.js'

const Run = (parent, child) => {
  parent.innerHTML = ''
  const isArray = Array.isArray(child)
  if (isArray) child.forEach((it) => it(parent))
  const isFunction = typeof child == 'function'
  if (isFunction) child(parent)
  console.log('run', isArray, isFunction)
}
window.addEventListener('hashchange', () => {
  Wv.Route.Notify()
})
export var Dom = (child, parent = document.getElementById('Main')) => {
  const render = () => Run(parent, child)
  render()
  RouteObserver.Subscribe(() => {
    render()
  })
}
