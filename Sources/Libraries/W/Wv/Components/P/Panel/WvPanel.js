import { UseState } from '../../../Actions/UseState.js'
import { Button } from '../../B/Button/Button.js'
import { WvCard } from '../../C/Card/WvCard.js'
import { WvCircle } from '../../C/Circle/WvCircle.js'
import { WvColumn } from '../../C/Column/WvColumn.js'
import { WvRow } from '../../R/Row/WvRow.js'
import { WvText } from '../../T/Text/WvText.js'

export const WvPanel = (
  label = '',
  child = [Button('coba')],
  show = true,
  direction = 'Row'
) => {
  const isShow = UseState(show)
  const ContentWrapper = direction == 'Row' ? WvRow : WvColumn
  const component = () =>
    WvRow([
      WvColumn([
        WvText(label),
        WvCircle(isShow.Value ? 'X' : 'O', () => {
          isShow.Value = !isShow.Value
        }),
      ]),
      isShow.Value ? WvCard(ContentWrapper(child)) : WvRow(),
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
