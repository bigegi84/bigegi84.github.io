import { Observer } from '../../../O/Observer/Observer.js'
import { Row } from '../Components/R/Row/Row.js'
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
    Effect: (
      children = () => {
        return document.createElement('div')
      }
    ) => {
      const Wrapper = Row()(ks)
      const a = Wrapper([])(parent)
      const component = Wrapper([])
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
