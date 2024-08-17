define(() => {
  return (label = null, labelCls = 'pakuan-textStrong') => {
    return () => {
      const component = document.createElement('label')
      if (label) component.innerHTML = label
      component.setAttribute('class', labelCls)
      return component
    }
  }
})
