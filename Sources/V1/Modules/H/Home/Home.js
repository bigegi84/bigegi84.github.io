import { Wv } from '../../../../Libraries/W/Wv/Wv.js'
import { Navigation } from '../../../Components/Navigation.js'

export const Home = () => {
  return Wv.Render({
    View: Navigation(),
    PanelContent: {
      Text: 'ini home',
    },
  })
}
