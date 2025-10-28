export function YObserver() {
  const observers = new Map() // key: fn.toString(), value: fn

  return {
    Subscribe(fn) {
      const key = fn.toString()
      observers.set(key, fn) // timpa jika string sama
    },

    unsubscribe(fn) {
      const key = fn.toString()
      observers.delete(key)
    },

    Notify(data) {
      console.log(this.size)
      for (const fn of observers.values()) {
        fn(data)
      }
    },

    get size() {
      return observers.size
    },
  }
}
export function Observer() {
  const observers = new Map()
  return {
    Subscribe(fn) {
      observers.set(fn, fn)
    },
    Notify(data) {
      for (const observer of observers.values()) {
        observer(data)
      }
    },
    Clear() {
      observers.clear()
    },
    unsubscribe(fn) {
      observers.delete(fn)
    },
    get size() {
      return observers.size
    },
  }
}
export function XObserver() {
  return {
    // observers: [],
    observers: new Set(),
    Subscribe(func) {
      // this._Unsubscribe(func)
      this.observers.push(func)
      console.log('observers', this.observers)
    },
    Notify(from) {
      console.log(`Observer.Notify from ${from}`)
      this.observers.forEach((observer) => observer(from))
    },
    _Unsubscribe(func) {
      this.observers = this.observers.filter((observer) => observer !== func)
    },
  }
}
