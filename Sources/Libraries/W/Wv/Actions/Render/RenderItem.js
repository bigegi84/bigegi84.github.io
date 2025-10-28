import { ItemB } from './Item/ItemB.js'
import { ItemC } from './Item/ItemC.js'
import { ItemI } from './Item/ItemI.js'
import { ItemP } from './Item/ItemP.js'
import { ItemR } from './Item/ItemR.js'
import { ItemT } from './Item/ItemT.js'
import { ItemV } from './Item/ItemV.js'

export const RenderItem = (key, value) => {
  var B = ItemB(key, value)
  if (B != null) return B
  var C = ItemC(key, value)
  if (C != null) return C
  var I = ItemI(key, value)
  if (I != null) return I
  var P = ItemP(key, value)
  if (P != null) return P
  var R = ItemR(key, value)
  if (R != null) return R
  var T = ItemT(key, value)
  if (T != null) return T
  var V = ItemV(key, value)
  if (V != null) return V
}
