import { ChordAdmin } from '../Modules/Admin/ChordAdmin.js'
import { ChordLogin } from '../Modules/Login/ChordLogin.js'

export const ChordRoute = (path) => {
  if (path.startsWith('/chord/login')) return ChordLogin()
  if (path.startsWith('/chord')) return ChordAdmin()
  return ChordLogin()
}
