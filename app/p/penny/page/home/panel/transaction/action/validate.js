define((require) => {
  var store = require('../store/index')
  return () => {
    const { asset_id, type_name, amount } = store.form
    if (!asset_id) return 'Asset required.'
    if (!type_name) return 'Type Name required.'
    if (!amount) return "Amount required and can't be 0."
    return 'ok'
  }
})
