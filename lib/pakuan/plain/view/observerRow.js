define((require) => {
  var state = require('../../state/index')
  return (children) => {
    const component = document.createElement('div')
    component.setAttribute('class', 'pakuan-row')
    state.observer.subscribe(() => {
      component.innerHTML = ''
      children().forEach((it) => component.appendChild(it))
    })
    children().forEach((it) => component.appendChild(it))
    return component
  }
})
