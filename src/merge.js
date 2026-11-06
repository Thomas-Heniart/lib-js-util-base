'use strict'

const isPlainObject = require('./isPlainObject')
const cloneObj = require('./util/cloneObj')
const { assertSafeKey } = require('./util/assertSafePath')

/**
 * This method is like `assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object.
 * @param {Object} target The destination target.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns a clone of `target`.
 */
const merge = (target, ...sources) => {
  if (!isPlainObject(target) || !Array.isArray(sources)) {
    return sources.length === 1 ? sources[0] : sources
  }

  const clone = cloneObj(target)

  for (const source of sources) {
    if (!isPlainObject(source)) {
      continue
    }

    const keys = Object.keys(source)

    for (const key of keys) {
      assertSafeKey(key)
      const targetValue = clone[key]
      const sourceValue = source[key]

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        clone[key] = targetValue.map((value, k) => {
          if (sourceValue.length <= k) {
            return value
          } else {
            return merge(value, sourceValue[k])
          }
        })

        if (sourceValue.length > targetValue.length) {
          clone[key] = clone[key].concat(sourceValue.slice(targetValue.length))
        }
      } else if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        clone[key] = merge(cloneObj(targetValue), sourceValue)
      } else {
        clone[key] = sourceValue
      }
    }
  }

  return clone
}

module.exports = merge
