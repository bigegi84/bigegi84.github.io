import { Wv } from "../../../../Libraries/W/Wv/Wv.js"

var data = Wv.UseStore([])
var count = Wv.UseStore(1)
export const Home = () => {
  const fn2 = () => Wv.Row(data.Value.map((it) => Wv.Button(`${it}`)))
  return Wv.Row([
    Wv.Effect(() => Button(`${count.Value}`)),
    Wv.Effect(fn2),
    Wv.Button(`coba`, () => {
      // count.Value = count.Value + 1
      data.Value = [...data.Value, 1]
    }),
    Wv.Effect(() => Button(`${window.location.hash}`)),
    Wv.Button(`coba`, () => {
      // count.Value = count.Value + 1
      // data.Value = [...data.Value, 1]
      Wv.Route.Push('/coba')
    }),
  ])
}
