define((require) => {
  var Observer = require('../../../observer')
  return (initial = null) => {
    var _value = initial
    var _observer = Observer()
    _observer.subscribe(() => {})
    return {
      get value() {
        return _value
      },
      set value(v) {
        _value = v
        _observer.notify()
      },
      get observer() {
        return _observer
      },
      observerView: (children) => {
        const component = document.createElement('div')
        var render = () => {
          var extract = children()
          if (Array.isArray(extract))
            extract.forEach((e) => component.appendChild(e))
          else component.appendChild(extract)
        }
        _observer.subscribe(() => {
          component.innerHTML = ''
          render()
        })
        render()
        return component
      },
      onChange: (callback) => {
        _observer.subscribe(() => {
          if (callback) callback()
        })
      },
    }
  }
})
