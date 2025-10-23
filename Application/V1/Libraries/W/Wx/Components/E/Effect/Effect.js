import { StoreObserver } from '../../../Observer/StoreObserver.js'
import { LayoutLinear } from '../../L/Layout/LayoutLinear.js'

var styleClass = 'WxLayoutLinear'
export var Effect = (
  child = () => {
    return () => {}
  }
) => {
  const component = document.createElement('div')
  component.setAttribute('class', styleClass)
  if (typeof child !== 'function')
    throw Error('Observer child must be function.')
  if (typeof child() !== 'function')
    throw Error('Observer child() must be function.')
  return (parent = document.createElement('div')) => {
    // const component = LayoutColumn()
    // component.setAttribute('class', className)
    var render = () => {
      component.innerHTML = ''
      child()(component)
    }
    render()
    parent.appendChild(component)
    StoreObserver.Subscribe(() => {
      render()
    })
  }
}
