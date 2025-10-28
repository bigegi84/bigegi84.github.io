import { ItemB } from './Item/ItemB.js'
import { ItemT } from './Item/ItemT.js'

export const RenderItem = (key, value) => {
  var B = ItemB(key, value)
  if (B != null) return B
  var T = ItemT(key, value)
  if (T != null) return T
}
