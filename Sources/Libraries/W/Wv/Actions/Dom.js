import { RouteObserver } from '../Observer/RouteObserver.js'
import { Wv } from '../Wv.js'

const Render = (parent, child) => {
  parent.innerHTML = ''
  child()(parent)
}
window.addEventListener('hashchange', () => {
  Wv.Route.Notify()
})
export var Dom = (child) => {
  const parent = document.getElementById('root')
  if (typeof child !== 'function') throw Error('Dom child is not a function.')
  if (typeof child() !== 'function')
    throw Error('Dom child() is not a function.')
  const render = () => Render(parent, child)
  render()
  RouteObserver.Subscribe(() => render())
}
