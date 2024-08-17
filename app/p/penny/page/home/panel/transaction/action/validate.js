define((require) => {
  var store = require('../store/index')
  return () => {
    const { account_id, type_name, amount } = store.form
    if (!account_id) return 'Account required.'
    if (!type_name) return 'Type Name required.'
    if (!amount) return "Amount required and can't be 0."
    return 'ok'
  }
})
