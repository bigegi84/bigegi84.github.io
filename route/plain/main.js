define((require) => {
  var route = require('./route')
  return () => {
    onhashchange = (event) => {
      route()
    }
    route()
  }
})
