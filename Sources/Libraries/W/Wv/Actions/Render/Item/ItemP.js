import { Component } from '../../../Components/Component.js'
import { Wv } from '../../../Wv.js'

export const ItemP = (key, value) => {
  if (key.startsWith('PanelColumn')) {
    return Component.PanelColumn(
      key.replace('PanelColumn', ''),
      Wv.Render(value)
    )
  }
  if (key.startsWith('PanelHide')) {
    return Component.PanelHide(key.replace('PanelHide', ''), Wv.Render(value))
  }
  if (key.startsWith('Panel')) {
    return Component.Panel(key.replace('Panel', ''), Wv.Render(value))
  }
  return null
}
