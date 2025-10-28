import { RouteObserver } from '../../../Observer/RouteObserver.js'
import { Wv } from '../../../Wv.js'

// const styleClass = 'WvRow'

window.addEventListener('hashchange', () => {
  Wv.Route.Notify()
})
export const Router = (
  prop = {
    '/': [() => {}],
    '/coba': [() => {}],
    '?': [() => {}],
  }
) => {
  const component = document.createElement('div')
  component.classList.add('WvRouter')
  component.setAttribute('data-wv-debug', 'WvRouter')
  //   component.classList.add(styleClass)
  const defaultRoute = prop['?']
  const currentPath = Wv.Route.Path()
  const currentRoute = prop[Wv.Route.Path()]
  return (parent = document.createElement('div')) => {
    parent.appendChild(component)
    const render = (path) => {
      component.innerHTML = ''
      if (prop[path] == null) defaultRoute.forEach((it) => it(component))
      else prop[path].forEach((it) => it(component))
    }
    render(currentPath)
    RouteObserver.Subscribe(() => {
      render(Wv.Route.Path())
    })
  }
}
