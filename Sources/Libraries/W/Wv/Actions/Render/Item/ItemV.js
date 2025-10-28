import { Row } from '../../../Components/R/Row/Row.js'
import { Wv } from '../../../Wv.js'

export const ItemV = (key, value) => {
  if (key.startsWith('View')) {
    // return value()
    console.log(Wv.Render({ PanelA: {} }))
    console.log(value)
    return Row(value)
    // return Wv.Render({ PanelA: {} })
  }
  return null
}
