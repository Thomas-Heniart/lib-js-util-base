'use strict'

const pickBy = (obj, predicate) => {
  if (obj === null) {
    return Object.create(null)
  }

  const newObj = Object.create(null)
  for (const key in obj) {
    const val = obj[key]
    if (predicate(val, key)) {
      newObj[key] = val
    }
  }

  return newObj
}

module.exports = pickBy
