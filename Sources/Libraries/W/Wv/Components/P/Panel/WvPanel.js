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
  const ContentWrapper = direction == 'Row' ? Row : WvColumn
  const component = () =>
    Row([
      WvColumn([
        Text(label),
        WvCircle(isShow.Value ? 'X' : 'O', () => {
          isShow.Value = !isShow.Value
        }),
      ]),
      ContentWrapper(isShow.Value ? child : []),
    ])
  return (parent = document.createElement('div')) => {
    const newParent = document.createElement('div')
    const update = () => {
      newParent.innerHTML = ''
      component()(newParent)
    }
    parent.appendChild(newParent)
    update()
    isShow.Subscribe(() => {
      update()
    })
  }
}
