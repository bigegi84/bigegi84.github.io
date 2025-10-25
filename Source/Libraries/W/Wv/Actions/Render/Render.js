import { Component } from '../../Components/Component.js'
import { RenderItem } from './RenderItem.js'

export const Render = (obj) => {
  var result = []
  for (var key in obj) {
    var item = RenderItem(key, obj[key])
    result.push(item)
  }
  return Component.Row(result)
}
