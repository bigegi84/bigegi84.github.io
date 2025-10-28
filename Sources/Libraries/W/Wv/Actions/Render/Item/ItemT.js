import { Component } from '../../../Components/Component.js'

export const ItemT = (key, value) => {
  if (key.startsWith('Text')) {
    return Component.Text(value)
  }
  return null
}
