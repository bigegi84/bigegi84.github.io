define((require) => {
  var state = require('../../state/index')
  return (children) => {
    return () => {
      const component = document.createElement('div')
      component.setAttribute('class', 'pakuan-column')
      var renderArray = (arr) => {
        arr.forEach((it) => {
          if (typeof it === 'function') component.appendChild(it())
        })
      }
      var render = (props) => {
        if (typeof props === 'function') {
          props().forEach((it) => {
            if (typeof it === 'function') component.appendChild(it())
            if (it.constructor === Array) renderArray(it)
          })
        } else {
          renderArray(props)
        }
      }
      state.observer.subscribe(() => {
        component.innerHTML = ''
        render(children)
      })
      render(children)
      return component
    }
  }
})
