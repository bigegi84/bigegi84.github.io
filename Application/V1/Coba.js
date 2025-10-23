import { Route } from './Libraries/W/Wx/Actions/Route.js'
import { Button } from './Libraries/W/Wx/Components/B/Button/Button.js'
import { LayoutLinear } from './Libraries/W/Wx/Components/L/Layout/LayoutLinear.js'

export const Coba = () => {
  const hash = window.location.hash.slice(1)
  if (hash.startsWith('/coba/sub'))
    return LayoutLinear(Button('ini page sub coba'))
  return LayoutLinear(
    Button('ini page coba', () => {
      Route.Push('/coba/sub')
    })
  )
}
