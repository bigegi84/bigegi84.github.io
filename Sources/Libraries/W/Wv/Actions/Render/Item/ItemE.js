import { Component } from '../../../Components/Component.js'

export const ItemE = (key, value) => {
  if (key.startsWith('Effect')) {
    return Component.Effect(value)
  }
  return null
}
