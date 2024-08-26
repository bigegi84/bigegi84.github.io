define((require) => {
  var app = require('../../app/index')
  var bigegi84 = require('../../bigegi84/index')
  return () => {
    document.getElementById('root').innerHTML = ''
    switch (window.location.hash) {
      case '#/':
        bigegi84.main()
        break
      case '#/calculator':
        app.c.calculator.main()
        break
      case '#/chordAdmin':
        app.c.chordAdmin.main()
        break
      case '#/pakuan':
        app.p.pakuan.main()
        break
      case '#/penny':
        app.p.penny.main()
        break
      default:
        bigegi84.main()
        break
    }
  }
})
