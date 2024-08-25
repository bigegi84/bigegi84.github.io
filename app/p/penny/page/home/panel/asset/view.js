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
          column: {
            row: {
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
              observerU: () =>
                pakuan.main({
                  'inputLabelTextUnit Name': [
                    store.form.unit_name,
                    (e) => (store.form.unit_name = e.target.value),
                  ],
                }),
            },
            buttonSave: async () => {
              var valid = action.validate()
              if (valid != 'ok') {
                alertify.error(valid)
                return
              }
              await action.http.createOneMe()
            },
          },
        },
      },
      panelFilter: {
        card: {
          column: {
            rowA: {
              observerA: () =>
                pakuan.main({
                  inputLabelTextSearch: [
                    store.filter.search,
                    (e) => (store.filter.search = e.target.value),
                  ],
                }),
              observerB: () =>
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
            },
            row: {
              buttonSave: () => action.http.readManyMe(),
              buttonClear: () => {
                store.filter.search = ''
                store.filter.column.type_id = ''
                action.http.readManyMe()
              },
            },
          },
        },
      },
      observerRow: () =>
        store.data.map((it) =>
          store.form.id === it.id
            ? pakuan.main({
                card: {
                  column: {
                    inputLabelTextName: [
                      store.form.name,
                      (e) => (store.form.name = e.target.value),
                    ],
                    'inputLabelTextType Name': [
                      store.form.type_name,
                      (e) => (store.form.type_name = e.target.value),
                    ],
                    inputLabelNumberBalance: [
                      store.form.balance,
                      (e) => (store.form.balance = e.target.value),
                    ],
                    'inputLabelTextUnit Name': [
                      store.form.unit_name,
                      (e) => (store.form.unit_name = e.target.value),
                    ],
                    row: {
                      buttonSave: async () => {
                        var valid = action.validate()
                        if (valid != 'ok') {
                          alertify.error(valid)
                          return
                        }
                        await action.http.updateOneMe()
                      },
                      buttonCancel: () => {
                        store.form.id = 0
                      },
                    },
                  },
                },
              })
            : pakuan.main({
                card: {
                  column: {
                    textStamp: it.name,
                    textStrong2: it.type.name,
                    textStrongC: `${new Intl.NumberFormat('en-US').format(
                      it.balance
                    )} ${it.unit.name}`,
                    buttonEdit: () => {
                      store.form.id = it.id
                      store.form.name = it.name
                      store.form.type_name = it.type.name
                      store.form.balance = it.balance
                      store.form.unit_name = it.unit.name
                    },
                  },
                },
              })
        ),
    },
  }
})
