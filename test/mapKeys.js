'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const { mapKeys } = require('../index')

test('mapKeys should map keys in `object` to a new object', (t) => {
  const actual = mapKeys({ a: 1, b: 2 }, (_, k) => `test.${k}`)
  alikePlain(t, actual, { 'test.a': 1, 'test.b': 2 })
})

test('mapKeys should treat arrays like objects', (t) => {
  const actual = mapKeys([1, 2], String)
  alikePlain(t, actual, { 1: 1, 2: 2 })
})

test('mapKeys should return the input value when is not an object', (t) => {
  const actual = mapKeys(12, String)
  alikePlain(t, actual, 12)
})
