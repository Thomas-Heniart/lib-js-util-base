'use strict'

const { assertSafeKey } = require('./util/assertSafePath')

/**
 * Assigns the object properties from the sources
 *
 * @param {object} object
 * @param  {...(object|Function)} rest
 * @returns {object}
 */
const assignInWith = (object, ...rest) => {
  if (rest.length === 0) return object
  const customizer = rest.pop()
  if (typeof customizer !== 'function') return object
  if (rest.length === 0) return object
  rest.forEach((source) => {
    for (const key in source) assertSafeKey(key)
  })
  rest.forEach((source) => {
    for (const key in source) {
      const value = customizer(object[key], source[key], key, object, source)
      object[key] = value === undefined ? source[key] : value
    }
  })
  return object
}

module.exports = assignInWith
