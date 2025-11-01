import { RenderItem } from './RenderItem.js'

export const Render = (obj) => {
  var result = []
  for (var key in obj) {
    var item = RenderItem(key, obj[key])
    const isArray = Array.isArray(item)
    if (isArray) result = [...result, ...item]
    else result.push(item)
  }
  return result
}
