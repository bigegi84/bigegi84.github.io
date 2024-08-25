define(() => {
  var className = 'pakuan-textStamp'
  return (name = null) => {
    const component = document.createElement('p')
    if (name) component.innerHTML = name
    component.setAttribute('class', className)
    return component
  }
})
