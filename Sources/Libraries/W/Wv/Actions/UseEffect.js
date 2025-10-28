import { Wu } from '../../Wu/Wu.js'

export var UseEffect = (action = () => {}, stateList = []) => {
  const debouncedAction = Wu.Debounce(action, 500)
  stateList.forEach((it) => it.Subscribe(() => debouncedAction()))
}
