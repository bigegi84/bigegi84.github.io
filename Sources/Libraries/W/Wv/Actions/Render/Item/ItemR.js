import { Component } from '../../../Components/Component.js'
import { Wv } from '../../../Wv.js'

export const ItemR = (key, value) => {
  if (key.startsWith('Row')) {
    return Component.Row(Wv.Render(value))
  }
  return null
}
