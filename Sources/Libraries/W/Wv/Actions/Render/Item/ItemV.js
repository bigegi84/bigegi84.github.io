import { WvRow } from '../../../Components/R/Row/WvRow.js'
import { Wv } from '../../../Wv.js'

export const ItemV = (key, value) => {
  if (key.startsWith('View')) {
    return value
    return WvRow(value)
  }
  return null
}
