import { StoreObserver } from '../../../Observer/StoreObserver.js'

const styleClass = 'WxLayoutLinear'
export const Effect = (
  child = () => {
    return () => {}
  }
) => {
  const component = document.createElement('div')
  component.setAttribute('class', styleClass)
  const IsFunction = typeof child() == 'function'
  const IsArray = Array.isArray(child())
  if (!IsFunction && !IsArray)
    throw Error('Effect child must be Function or Array.')
  return (parent = document.createElement('div')) => {
    const render = () => {
      component.innerHTML = ''
      if (IsArray) {
        child().forEach((it) => it(component))
      }
      if (!IsArray) child()(component)
    }
    render()
    parent.appendChild(component)
    StoreObserver.Subscribe(() => render())
  }
}
