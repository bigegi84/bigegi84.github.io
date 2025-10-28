import { Component } from '../../../Components/Component.js'

export const ItemT = (key, value) => {
  if (key.includes('Text')) {
    return Component.Text(value)
  }
}
