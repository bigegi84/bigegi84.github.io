import { UseState } from '../../../Actions/UseState.js'
import { WvCircle } from '../../C/Circle/WvCircle.js'
import { WvColumn } from '../../C/Column/WvColumn.js'
import { Row } from '../../R/Row/Row.js'
import { Text } from '../../T/Text/Text.js'

export const WvPanel = (label = '', child, show = true, direction = 'Row') => {
  const isShow = UseState(show)
  const Wrapper = direction == 'Row' ? Row : WvColumn
  const component = () =>
    Wrapper([
      WvColumn([
        Text(label),
        WvCircle(isShow.Value ? 'X' : 'O', () => {
          isShow.Value = !isShow.Value
        }),
      ]),
      Row(isShow.Value ? Row(child) : Row()),
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
