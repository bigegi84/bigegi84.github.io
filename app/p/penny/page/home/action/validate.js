define((require) => {
  var store = require('../../../store/index')
  return () => {
    const { name, type_name, balance } = store.account.form
    if (!name) return 'Name required.'
    if (!type_name) return 'Type Name required.'
    if (!balance) return 'Balance required.'
    return 'ok'
  }
})
