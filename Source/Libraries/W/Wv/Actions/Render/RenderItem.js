import { ItemB } from './Item/ItemB.js'

export const RenderItem = (key, value) => {
  var B = ItemB(key, value)
  if (B != null) return B
}
