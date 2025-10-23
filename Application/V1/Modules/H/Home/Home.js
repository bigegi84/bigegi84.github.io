import { Button } from '../../../Libraries/W/Wx/Components/B/Button/Button.js'
import { Effect } from '../../../Libraries/W/Wx/Components/E/Effect/Effect.js'
import { LayoutLinear } from '../../../Libraries/W/Wx/Components/L/Layout/LayoutLinear.js'
import { Wx } from '../../../Libraries/W/Wx/Wx.js'

var data = Wx.UseStore([])
var count = Wx.UseStore(1)
export const Home = () => {
  const fn2 = () => LayoutLinear(data.Value.map((it) => Button(`${it}`)))
  return LayoutLinear([
    Effect(() => Button(`${count.Value}`)),
    Effect(fn2),
    Button(`coba`, () => {
      // count.Value = count.Value + 1
      data.Value = [...data.Value, 1]
    }),
    Effect(() => Button(`${window.location.hash}`)),
    Button(`coba`, () => {
      // count.Value = count.Value + 1
      // data.Value = [...data.Value, 1]
      Wx.Route.Push('/coba')
    }),
  ])
}
