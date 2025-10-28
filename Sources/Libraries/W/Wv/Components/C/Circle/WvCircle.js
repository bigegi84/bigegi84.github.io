const styleClass = 'WvCircle'

export var WvCircle = (label, onClick = () => {}) => {
  const component = document.createElement('button')
  component.setAttribute('class', styleClass)
  if (typeof label !== 'undefined') component.innerHTML = label
  // component.style.padding = '0 1.5em'
  // component.style.padding = '0 1.5em'
  return (parent = document.createElement('div')) => {
    component.onclick = () => {
      if (onClick) onClick()
    }
    parent.appendChild(component)
  }
}
