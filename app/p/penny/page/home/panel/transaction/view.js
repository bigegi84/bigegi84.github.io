define((require) => {
  var { pakuan } = require('../../../../../../../lib/index')

  var state = require('./state/index')
  var store = require('./store/index')
  var assetStore = require('../asset/store/index')
  var action = require('./action/index')
  action.http.readManyMe()
  return {
    panelHideTransaction: {
      panelAdd: {
        card: {
          observerA: () =>
            pakuan.main({
              inputLabelSelectAsset: {
                state: [
                  store.form.asset_id,
                  (e) => {
                    console.log(store.form.asset_id)
                    store.form.asset_id = e.target.value
                  },
                ],
                option: assetStore.data.map((it) => [it.name, it.id]),
              },
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
              inputLabelNumberAmount: [
                store.form.amount,
                (e) => {
                  store.form.amount = e.target.value
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
          },
        },
      },
      observerRow: () =>
        store.data.map((it) =>
          pakuan.main({
            card: {
              column: {
                textStampDate: moment(it.created_at).format(
                  'DD MMMM yyyy HH:mm:ss'
                ),
                textStrong: it.asset ? it.asset.name : '',
                textStrong2: it.type.name,
                textStrongC: it.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'IDR',
                }),
                buttonDelete: () => {
                  alertify.confirm(
                    'Are you sure?',
                    async function () {
                      await action.http.deleteOneMe(it.id)
                    },
                    function () {}
                  )
                },
              },
            },
          })
        ),
    },
  }
})
