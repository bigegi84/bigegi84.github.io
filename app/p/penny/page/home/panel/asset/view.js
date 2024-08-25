define((require) => {
  var { pakuan } = require('../../../../../../../lib/index')

  var state = require('./state/index')
  var store = require('./store/index')
  var action = require('./action/index')
  action.http.readManyMe()
  return {
    panelHideAsset: {
      panelAdd: {
        card: {
          observerA: () =>
            pakuan.main({
              inputLabelTextName: [
                store.form.name,
                (e) => (store.form.name = e.target.value),
              ],
            }),
          observerT: () =>
            pakuan.main({
              'inputLabelTextType Name': [
                store.form.type_name,
                (e) => (store.form.type_name = e.target.value),
              ],
            }),
          observerL: () =>
            pakuan.main({
              inputLabelNumberBalance: [
                store.form.balance,
                (e) => {
                  store.form.balance = e.target.value
                },
              ],
            }),
          buttonSave: async () => {
            var valid = action.validate()
            if (valid != 'ok') {
              alertify.error(valid)
              return
            }
            await action.http.createOneMe()
            action.emptyForm()
          },
        },
      },
      panelFilter: {
        card: {
          column: {
            'inputLabelSelectAsset Type': {
              state: [
                null,
                (e) => {
                  console.log(store.form.account_id)
                  store.form.account_id = e.target.value
                },
              ],
              option: [['coba', 'coba']],
            },
            buttonSave: () => {},
          },
        },
      },
      observerRow: () =>
        store.data.map((it) =>
          pakuan.main({
            card: {
              column: {
                textStamp: it.name,
                textStrong2: it.type.name,
                textStrongC: it.balance.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'IDR',
                }),
              },
            },
          })
        ),
    },
  }
})
