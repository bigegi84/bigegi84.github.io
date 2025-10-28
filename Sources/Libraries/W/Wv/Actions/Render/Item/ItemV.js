export const ItemV = (key, value) => {
  if (key.startsWith('View')) {
    return value()
  }
  return null
}
