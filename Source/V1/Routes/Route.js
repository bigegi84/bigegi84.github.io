import { Coba } from '../Coba.js'
import { ChordAdmin } from '../Modules/C/Chord/Modules/Admin/ChordAdmin.js'
import { ChordLogin } from '../Modules/C/Chord/Modules/Login/ChordLogin.js'
import { Home } from '../Modules/H/Home/Home.js'

export const Route = () => {
  const hash = window.location.hash.slice(1)
  if (hash.startsWith('/chord/login')) return ChordLogin()
  if (hash.startsWith('/coba')) return Coba()
  return ChordAdmin()
}
