export function deepGet(obj: Object, path: string) {
  const keys = path.split('.')
  return keys.reduce((prev, key) => prev && prev[key], obj)
}

export function deepSet(obj: Object, path: string, value: any) {
  const keys = path.split('.')
  const lastKey = keys.pop()

  let current = obj
  for (let k of keys) {
    // TODO: Create an array when the next key is a number.
    if (current[k] === undefined) {
      current[k] = {}
    }

    if (typeof current[k] !== 'object') {
      return
    }

    current = current[k]
  }
  
  current[lastKey] = value
}