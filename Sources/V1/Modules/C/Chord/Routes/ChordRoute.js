import { ChordLogin } from '../Modules/Login/ChordLogin'

export const ChordRoute = () => {
  const hash = window.location.hash.slice(1)
  if (hash.startsWith('/chord/login')) return <ChordLogin />
  return <ChordLogin />
}
