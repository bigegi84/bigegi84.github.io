import { Coba } from '../Coba.js'
import { Home } from '../Modules/H/Home/Home.js'

export const Route = () => {
  const hash = window.location.hash.slice(1)
  if (hash.startsWith('/coba')) return Coba()
  return Home()
}
