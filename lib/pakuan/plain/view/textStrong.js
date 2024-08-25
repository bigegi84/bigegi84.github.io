define(() => {
  var className = 'pakuan-textStrong'
  return (label = null) => {
    const component = document.createElement('strong')
    if (label) component.innerHTML = label
    component.setAttribute('class', className)
    return component
  }
})
