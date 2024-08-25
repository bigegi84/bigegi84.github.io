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
        store.data.map((it) => {
          var isEdit = pakuan.view.useState(false)
          return isEdit.observerView(() =>
            isEdit.value
              ? pakuan.main({
                  card: {
                    column: {
                      inputLabelTextName: [it.type.name, () => {}],
                      textStrong2: it.type.name,
                      textStrongC: `${new Intl.NumberFormat('en-US').format(
                        it.balance
                      )} ${it.unit.name}`,
                      buttonCancel: () => {
                        isEdit.value = false
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
                        isEdit.value = true
                      },
                    },
                  },
                })
          )
          return pakuan.main({
            card: {
              view: isEdit.observerView(() =>
                isEdit.value
                  ? pakuan.main({
                      column: {
                        textLabelInputName: ['', () => {}],
                        textStrong2: it.type.name,
                        textStrongC: `${new Intl.NumberFormat('en-US').format(
                          it.balance
                        )} ${it.unit.name}`,
                        buttonEdit: () => {
                          isEdit.value = true
                        },
                      },
                    })
                  : pakuan.main({
                      column: {
                        textStamp: it.name,
                        textStrong2: it.type.name,
                        textStrongC: `${new Intl.NumberFormat('en-US').format(
                          it.balance
                        )} ${it.unit.name}`,
                        buttonEdit: () => {
                          isEdit.value = true
                        },
                      },
                    })
              ),
            },
          })
        }),
    },
  }
})
