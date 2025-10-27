import { StateObserver } from '../Observer/StateObserver.js'

// var UseEffectActions = []
export var UseEffect = (action = () => {}, stateList = [1]) => {
  console.log('useeffect kepanggil')
  if (!typeof action === 'function') throw new Error('action is not function')
  if (!Array.isArray(stateList)) throw new Error('stateList is not list')
  StateObserver.Subscribe((it) => {


})
  //   var find = UseEffectActions.filter((it) => it == action)
  //   if (find.length == 0) {
  //     UseEffectActions.push([action, stateList])
  //     action()
  //   } else {
  //     const isSame = find[0][1] == stateList
  //     console.log('isSame', isSame)
  //     if (isSame) action()
  //   }
}
