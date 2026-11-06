'use strict'

const { assertSafePath } = require('./util/assertSafePath')

/**
 * Sets the value at path of object
 * @param {Object} obj
 * @param {string | Array} path
 * @param {any} value
 * @returns {Object}
 */
const set = (obj, path, value) => {
  if (!obj) return obj
  const segments = assertSafePath(path)
  let current = obj

  const lastIndex = segments.length - 1
  for (let i = 0; i < segments.length; i++) {
    const key = segments[i]

    if (i === lastIndex) {
      current[key] = value
      return obj
    }

    if (!Object.hasOwn(current, key) || !current[key] || typeof current[key] !== 'object') {
      current[key] = Object.create(null)
    }

    current = current[key]
  }

  return obj
}

module.exports = set
