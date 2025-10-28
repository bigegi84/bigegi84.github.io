const styleClass = 'WvText'

export var Text = (text) => {
  const component = document.createElement('p')
  if (typeof text !== 'undefined') component.innerHTML = text
  if (typeof styleClass !== 'undefined') component.className = styleClass
  // component.setAttribute("class", className);
  //   component.style.padding = '0 1.5em'
  return (parent = document.createElement('div')) => {
    parent.appendChild(component)
  }
}
