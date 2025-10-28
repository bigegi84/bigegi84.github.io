import { Wv } from '../../../../../Libraries/W/Wv/Wv.js'
import { Navigation } from '../../../../Components/Navigation.js'

export const ChordLayout = (child) => {
  return Wv.Render({
    View: Navigation,
    Row: child,
  })
}
