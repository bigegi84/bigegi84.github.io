import { Wv } from '../../Libraries/W/Wv/Wv.js'

export const Coba = () => {
  const hash = window.location.hash.slice(1)
  if (hash.startsWith('/coba/sub'))
    return Wv.Row(Wv.Button('ini page sub coba'))
  return LayoutLinear(
    Wv.Button('ini page coba', () => {
      Route.Push('/coba/sub')
    })
  )
}
