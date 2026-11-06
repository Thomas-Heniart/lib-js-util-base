'use strict'

const toPath = require('./toPath')

const assertSafeKey = (key) => {
  if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
    throw new Error('ERR_UNSAFE_PATH')
  }
}

const assertSafePath = (path) => {
  const segments = toPath(path)
  for (const key of segments) assertSafeKey(key)
  return segments
}

module.exports = { assertSafeKey, assertSafePath }
