define((require) => {
  var state = require('../../state/index')
  return (children) => {
    const component = document.createElement('div')
    component.setAttribute('class', 'pakuan-row')
    var render = () => {
      children().forEach((it) => {
        if (Array.isArray(it)) it.forEach((e) => component.appendChild(e))
        else component.appendChild(it)
      })
    }
    state.observer.subscribe(() => {
      component.innerHTML = ''
      render()
    })
    render()
    return component
  }
})
