import { Wv } from '../../../../Libraries/W/Wv/Wv.js'
import { Navigation } from '../../../Components/Navigation.js'

var data = Wv.UseStore([])
var count = Wv.UseStore(1)
export const Home = () => {
  return Wv.Render({
    View: Navigation(),
    PanelContent: {
      Text: 'ini home',
    },
  })
}
