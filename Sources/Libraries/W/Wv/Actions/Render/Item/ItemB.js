import { Component } from '../../../Components/Component.js'

export const ItemB = (key, value) => {
  if (key.startsWith('Button')) {
    return Component.Button(key.replace('Button',''), value)
  }
  return null
}
