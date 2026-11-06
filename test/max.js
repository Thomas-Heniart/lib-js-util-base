'use strict'

const test = require('brittle')
const assert = require('assert')
const max = require('../src/max')

test('max should return the largest value from a collection', () => {
  const actual = max([4, null, 2, 8, 6])

  assert.strictEqual(actual, 8)
})

test('max should return `undefined` without arguments', () => {
  const actual = max()

  assert.strictEqual(actual, undefined)
})

test('max should return `undefined` for empty collections', () => {
  const sources = [null, undefined, false, 0, NaN, '', Symbol('a'), []]

  for (const source of sources) {
    const actual = max(source)

    assert.strictEqual(actual, undefined)
  }
})

test('max should return the largest value from a string collection', () => {
  const actual = max(['cd', null, 'ab', 'gh', 'ef'])

  assert.strictEqual(actual, 'gh')
})
