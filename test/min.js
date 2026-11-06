'use strict'

const test = require('brittle')
const assert = require('assert')
const min = require('../src/min')

test('min should return the smallest value from a collection', () => {
  const actual = min([4, null, 2, 8, 6])

  assert.strictEqual(actual, 2)
})

test('min should return `undefined` without arguments', () => {
  const actual = min()

  assert.strictEqual(actual, undefined)
})

test('min should return `undefined` for empty collections', () => {
  const sources = [null, undefined, false, 0, NaN, '', Symbol('a'), []]

  for (const source of sources) {
    const actual = min(source)

    assert.strictEqual(actual, undefined)
  }
})

test('min should return the smallest value from a string collection', () => {
  const actual = min(['cd', null, 'ab', 'gh', 'ef'])

  assert.strictEqual(actual, 'ab')
})
