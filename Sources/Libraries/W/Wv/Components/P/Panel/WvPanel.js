import { UseState } from '../../../Actions/UseState.js'
import { Button } from '../../B/Button/Button.js'
import { WvCircle } from '../../C/Circle/WvCircle.js'
import { WvColumn } from '../../C/Column/WvColumn.js'
import { Row } from '../../R/Row/Row.js'
import { Text } from '../../T/Text/Text.js'

export const WvPanel = (
  label = '',
  child = [Button('coba')],
  show = true,
  direction = 'Row'
) => {
  const isShow = UseState(show)
  const Wrapper = direction == 'Row' ? Row : WvColumn
  const component = () =>
    Row([
      WvColumn([
        Text(label),
        WvCircle(isShow.Value ? 'X' : 'O', () => {
          isShow.Value = !isShow.Value
        }),
      ]),
      Wrapper(isShow.Value ? child : []),
    ])
  return (parent = document.createElement('div')) => {
    const update = () => {
      parent.innerHTML = ''
      component()(parent)
    }
    update()
    isShow.Subscribe(() => {
      update()
    })
  }
}
