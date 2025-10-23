import { RouteObserver } from '../Observer/RouteObserver.js'

const Render = (parent, child) => {
  parent.innerHTML = ''
  child()(parent)
}
export var Dom = (child) => {
  const parent = document.getElementById('root')
  if (typeof child !== 'function') throw Error('Dom child is not a function.')
  if (typeof child() !== 'function')
    throw Error('Dom child() is not a function.')
  const render = () => Render(parent, child)
  render()
  RouteObserver.Subscribe(() => render())
}
