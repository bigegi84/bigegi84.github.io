import { ChordAdmin } from '../Modules/Admin/ChordAdmin.js'
import { ChordLogin } from '../Modules/Login/ChordLogin.js'

export const ChordRoute = () => {
  return {
    '/chord': ChordAdmin(),
    '/chord/login': ChordLogin(),
  }
}
