const styleClass = 'WxButton'

export var Button = (label, onClick = () => {}) => {
  const component = document.createElement('button')
  if (typeof label !== 'undefined') component.innerHTML = label
  if (typeof styleClass !== 'undefined') component.className = styleClass
  // component.setAttribute("class", className);
  component.style.padding = '0 1.5em'
  return (parent = document.createElement('div')) => {
    component.onclick = () => {
      if (onClick) onClick()
    }
    parent.appendChild(component)
  }
}
