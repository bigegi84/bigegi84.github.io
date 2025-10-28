import { Component } from '../../../Components/Component.js'
import { Wv } from '../../../Wv.js'

export const ItemP = (key, value) => {
  if (key.includes('PanelColumn')) {
    return Component.PanelColumn(
      key.replace('PanelColumn', ''),
      Wv.Render(value)
    )
  }
  if (key.includes('Panel')) {
    return Component.Panel(key.replace('Panel', ''), Wv.Render(value))
  }
  return null
}
