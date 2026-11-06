'use strict'

const test = require('brittle')
const assert = require('assert')
const { mapKeys } = require('../index')

test('mapKeys should map keys in `object` to a new object', () => {
  const actual = mapKeys({ a: 1, b: 2 }, (_, k) => `test.${k}`)
  assert.deepStrictEqual(actual, { 'test.a': 1, 'test.b': 2 })
})

test('mapKeys should treat arrays like objects', () => {
  const actual = mapKeys([1, 2], String)
  assert.deepStrictEqual(actual, { 1: 1, 2: 2 })
})

test('mapKeys should return the input value when is not an object', () => {
  const actual = mapKeys(12, String)
  assert.deepStrictEqual(actual, 12)
})
