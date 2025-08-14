define((require) => {
  var app = require('../../app/index')
  var { C, P } = require('../../Application/Index')
  var bigegi84 = require('../../bigegi84/index')
  return () => {
    document.getElementById('root').innerHTML = ''
    if (window.location.hash.includes('#/ChordAdmin')) {
      C.ChordAdmin.Main()
      return
    }
    if (window.location.hash.includes('#/pakuan-test')) {
      P.PakuanTest.Main()
      return
    }
    switch (window.location.hash) {
      case '#/':
        bigegi84.main()
        break
      case '#/calculator':
        app.c.calculator.main()
        break
      case '#/ChordAdmin':
        app.c.chordAdmin.main()
        break
      case '#/pakuan':
        app.p.pakuan.main()
        break
      // case '#/pakuan-test':
      //   P.PakuanTest.Main()
      //   break
      case '#/penny':
        app.p.penny.main()
        break
      default:
        bigegi84.main()
        break
    }
  }
})
