define((require) => {
  var store = require('../store/index')
  return () => {
    const { name, type_name, balance, unit_name } = store.form
    if (!name) return 'Name required.'
    if (!type_name) return 'Type Name required.'
    if (!balance) return 'Balance required.'
    if (!unit_name) return 'Unit Name required.'
    return 'ok'
  }
})
