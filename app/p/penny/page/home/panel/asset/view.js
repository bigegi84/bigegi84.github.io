define((require) => {
  var { pakuan } = require('../../../../../../../lib/index')

  var state = require('./state/index')
  var store = require('./store/index')
  var action = require('./action/index')
  action.http.readManyMe()
  action.http.assetType.readAllMe()
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
            observerA: () =>
              pakuan.main({
                'inputLabelSelectAsset Type': {
                  state: [
                    store.filter.column.type_id,
                    (e) => {
                      store.filter.column.type_id = e.target.value
                    },
                  ],
                  option: store.assetType.data.map((it) => [it.name, it.id]),
                },
              }),
            row: {
              buttonSave: () => action.http.readManyMe(),
              buttonClear: () => {
                store.filter.column.type_id = ''
                action.http.readManyMe()
              },
            },
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
                textStrongC: `${new Intl.NumberFormat('en-US').format(
                  it.balance
                )} IDR`,
              },
            },
          })
        ),
    },
  }
})
