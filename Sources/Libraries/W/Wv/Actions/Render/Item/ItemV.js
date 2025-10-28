import { Row } from '../../../Components/R/Row/Row.js'
import { Wv } from '../../../Wv.js'

export const ItemV = (key, value) => {
  if (key.startsWith('View')) {
    return value
    return Row(value)
  }
  return null
}
