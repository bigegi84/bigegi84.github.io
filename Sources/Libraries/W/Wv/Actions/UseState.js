import { Observer } from '../../../O/Observer/Observer.js'

export const UseState = (initial = null) => {
  let _Value = initial
  // const _Observer = StateObserver
  const _Observer = Observer()
  return {
    get Value() {
      return _Value
    },
    set Value(v) {
      _Value = v
      _Observer.Notify('UseState.setValue')
    },
    Effect: (
      child = () => {
        return document.createElement('div')
      }
    ) => {
      const component = document.createElement('div')
      return (parent = document.createElement('div')) => {
        const render = () => {
          component.innerHTML = ''
          child()(component)
        }
        render()
        parent.appendChild(component)
        _Observer.Subscribe(() => render())
      }
    },
    Subscribe: (callback) => {
      _Observer.Subscribe(() => {
        if (callback) callback()
      })
    },
  }
}
