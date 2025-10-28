import { Component } from '../../../Components/Component.js'
import { Wv } from '../../../Wv.js'

export const ItemC = (key = '', value) => {
  if (key.startsWith('Column')) {
    return Component.Column(Wv.Render(value, 'Column'))
  }
  return null
}
