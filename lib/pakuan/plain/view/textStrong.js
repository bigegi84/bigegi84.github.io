define(() => {
  return (label = null, className = 'pakuan-textStrong') => {
    return () => {
      const component = document.createElement('strong')
      if (label !== null) component.innerHTML = label
      component.setAttribute('class', className)
      return component
    }
  }
})
