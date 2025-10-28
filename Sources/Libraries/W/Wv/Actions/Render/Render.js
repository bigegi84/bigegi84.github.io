import { Component } from '../../Components/Component.js'
import { RenderItem } from './RenderItem.js'

export const Render = (obj, direction = 'Row') => {
  var result = []
  for (var key in obj) {
    var item = RenderItem(key, obj[key])
    // const isArray = Array.isArray(item)
    // if (isArray) result = [...result, ...item]
    // else result.push(item)
    result.push(item)
  }
  return result
  // return Component.Button('coba')
  // return direction == 'Row' ? Component.Row(result) : Component.Column(result)
}
