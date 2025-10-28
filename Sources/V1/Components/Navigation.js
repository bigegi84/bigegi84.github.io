import { Wv } from '../../Libraries/W/Wv/Wv.js'

export const Navigation = () => {
  return Wv.Render({
    PanelColumnApplication: {
      ButtonHome: () => Wv.Route.Push('/'),
      ButtonChord: () => Wv.Route.Push('/chord'),
      ButtonPenny: () => Wv.Route.Push('/penny'),
    },
  })
}
