export const ItemV = (key, value) => {
  if (key.includes('View')) {
    return value()
  }
  return null
}
