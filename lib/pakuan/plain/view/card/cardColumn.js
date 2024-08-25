define(() => {
  return (children) => {
    const component = document.createElement('div')
    component.setAttribute('class', 'pakuan-card pakuan-column')
    component.style.gap = '10px'
    children.forEach((it) => component.appendChild(it))
    return component
  }
})
