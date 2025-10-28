import { TimeLimitedCache } from './TimeLimitedCache.js'

const Wd = {
  Cache: new TimeLimitedCache(),
}
window.Wd = Wd
export { Wd }
