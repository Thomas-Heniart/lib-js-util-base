'use strict'

const omitBy = (obj, predicate) => {
  if (obj === null) {
    return Object.create(null)
  }

  const result = Object.create(null)
  for (const key in obj) {
    const val = obj[key]
    if (!predicate(val, key)) {
      result[key] = val
    }
  }

  return result
}

module.exports = omitBy
