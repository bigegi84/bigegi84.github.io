import { Observer } from '../../../O/Observer/Observer.js'
import { StateObserver } from '../Observer/StateObserver.js'

const _observer = StateObserver

export var UseStateR = (initial = null) => {
  var _value = initial
  // const _observer = Observer()
  var setget = {
    get Value() {
      return _value
    },
    set Value(v) {
      console.log('masuk set val')
      _value = v
      _observer.Notify()
    },
  }
  var setState = (input) => {
    _value = input
    console.log('masuk set state', _value)
    _observer.Notify()
  }
  return [setget.Value, setState]
}
