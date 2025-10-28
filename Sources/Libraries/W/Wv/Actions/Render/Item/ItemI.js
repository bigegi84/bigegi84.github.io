import { Component } from '../../../Components/Component.js'

export const ItemI = (key, value) => {
  if (key.includes('InputT')) {
    return Component.InputT(key.replace('InputT', ''), value)
  }
  if (key.includes('InputP')) {
    return Component.InputP(key.replace('InputP', ''), value)
  }
  return null
}
