define(() => {
  return (name = null) => {
    var className = 'pakuan-textStamp'
    return () => {
      const component = document.createElement('p')
      if (name) component.innerHTML = name
      component.setAttribute('class', className)
      return component
    }
  }
})
