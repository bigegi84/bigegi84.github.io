import { StoreObserver } from '../Observer/StoreObserver.js'

export const UseStore = (initial = null) => {
  var _value = initial
  const _observer = StoreObserver
  return {
    get Value() {
      return _value
    },
    set Value(v) {
      _value = v
      _observer.Notify('UseState.setValue')
    },
    ObserverLayout: (
      children = () => {
        return document.createElement('div')
      }
    ) => {
      const component = document.createElement('div')
      var render = () => {
        var extract = children()
        if (Array.isArray(extract))
          extract.forEach((e) => component.appendChild(e))
        else component.appendChild(extract)
      }
      _observer.Subscribe(() => {
        component.innerHTML = ''
        render()
      })
      render()
      return component
    },
    Subscribe: (callback) => {
      _observer.Subscribe(() => {
        if (callback) callback()
      })
    },
  }
}
