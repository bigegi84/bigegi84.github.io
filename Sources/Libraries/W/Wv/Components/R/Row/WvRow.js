const styleClass = 'WvRow'
export const WvRow = (child = [() => {}]) => {
  const component = document.createElement('div')
  component.setAttribute('class', styleClass)
  return (parent = document.createElement('div')) => {
    const isArray = Array.isArray(child)
    if (isArray) child.forEach((it) => it(component))
    if (!isArray) child(component)
    parent.appendChild(component)
  }
}
