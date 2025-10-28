const styleClass = 'WvCard'
export const WvCard = (child) => {
  const component = document.createElement('div')
  component.setAttribute('class', styleClass)
  const isArray = Array.isArray(child)
  console.log(isArray)
  return (parent = document.createElement('div')) => {
    if (isArray) child.forEach((it) => it(component))
    if (!isArray) child(component)
    console.log(parent)
    parent.appendChild(component)
  }
}
