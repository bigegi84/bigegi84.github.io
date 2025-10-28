const Seccond = 60 * 10
export class TimeLimitedCache {
  constructor() {
    this.store = new Map()
  }
  set(key, value, seconds = Seccond) {
    const expiresAt = Date.now() + seconds * 1000
    if (this.store.has(key)) {
      clearTimeout(this.store.get(key).timeout)
    }
    const timeout = setTimeout(() => {
      this.store.delete(key)
      console.log(`Cache: ${key} deleted.`)
    }, seconds * 1000)
    this.store.set(key, { value, expiresAt, timeout })
  }
  get(key) {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return undefined
    }
    return entry.value
  }
  has(key) {
    return this.get(key) !== undefined
  }
  clear() {
    for (const { timeout } of this.store.values()) {
      clearTimeout(timeout)
    }
    this.store.clear()
  }
}
