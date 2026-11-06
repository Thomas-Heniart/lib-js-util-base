'use strict'

const cloneDeep = require('./cloneDeep')
const unset = require('./unset')

const omit = (obj, keys) => {
  if (obj === null || obj === undefined) {
    return Object.create(null)
  }

  const result = cloneDeep(obj)
  const keyList = Array.isArray(keys) ? keys : []

  for (const key of keyList) {
    unset(result, key)
  }

  return result
}

module.exports = omit
