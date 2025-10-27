import { Observer } from '../../../O/Observer/Observer.js'
import { StateObserver } from '../Observer/StateObserver.js'

export var UseState = (initial = null) => {
  console.log('init state')
  var _value = initial
  const _observer = StateObserver
  // const _observer = Observer()
  return {
    get Value() {
      return _value
    },
    set Value(v) {
      _value = v
      console.log('value state', _value)
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
      _observer.subscribe(() => {
        if (callback) callback()
      })
    },
  }
}
