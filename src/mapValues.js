'use strict'

const get = require('./get')

/**
 * Maps the values of an object or array using the provided iteratee function or property path.
 *
 * @param {object|Array} src - The source object or array to map.
 * @param {Function|string} iteratee - The iteratee function or property path to map the values.
 * @returns {object} - The new object with mapped values.
 */
const mapValues = (src, iteratee) => {
  const result = Object.create(null)
  const _iteratee = typeof iteratee === 'function' ? iteratee : (value) => get(value, iteratee)
  for (const key in src) {
    result[key] = _iteratee(src[key])
  }
  return result
}

module.exports = mapValues
