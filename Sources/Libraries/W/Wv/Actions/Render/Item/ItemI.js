import { Component } from '../../../Components/Component.js'
import { WvComponent } from '../../../WvComponent.js'

export const ItemI = (key, value) => {
  if (key.startsWith('InputNU0')) {
    return WvComponent.InputNU0(key.replace('InputNU0', ''), value)
  }
  if (key.startsWith('InputN')) {
    return WvComponent.InputN(key.replace('InputN', ''), value)
  }
  if (key.startsWith('InputNU0')) {
    return WvComponent.InputNU0(key.replace('InputNU0', ''), value)
  }
  if (key.startsWith('InputP')) {
    return Component.InputP(key.replace('InputP', ''), value)
  }
  if (key.startsWith('InputT')) {
    return Component.InputT(key.replace('InputT', ''), value)
  }
  return null
}
