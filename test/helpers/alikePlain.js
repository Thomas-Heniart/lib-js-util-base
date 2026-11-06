'use strict'

// Compare values while allowing dictionary results to have null prototypes.
const toPlain = (value, seen = new WeakMap()) => {
  if (value === null || typeof value !== 'object') return value
  if (seen.has(value)) return seen.get(value)

  const prototype = Object.getPrototypeOf(value)
  if (!Array.isArray(value) && prototype !== null && prototype !== Object.prototype) return value

  const result = Array.isArray(value) ? [] : {}
  seen.set(value, result)
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (Object.hasOwn(descriptor, 'value')) descriptor.value = toPlain(descriptor.value, seen)
    Object.defineProperty(result, key, descriptor)
  }
  return result
}

module.exports = (t, actual, expected) => t.alike(toPlain(actual), expected)
