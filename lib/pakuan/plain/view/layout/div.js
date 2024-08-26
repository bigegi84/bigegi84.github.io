define(() => {
  return (children = null, className = null) => {
    const component = document.createElement('div')
    if (className) component.setAttribute('class', className)
    if (children) children.forEach((it) => component.appendChild(it))
    return component
  }
})
