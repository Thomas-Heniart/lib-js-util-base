'use strict'

const test = require('brittle')
const assert = require('assert')
const { sum } = require('../index')

test('sum should return a sum of array items', () => {
  assert.strictEqual(sum([1, 2, 3]), 6)
})

test('sum should return 0 if argument is not array', () => {
  assert.strictEqual(sum({}), 0)
  assert.strictEqual(sum(null), 0)
  assert.strictEqual(sum(), 0)
  assert.strictEqual(sum('foo'), 0)
})
