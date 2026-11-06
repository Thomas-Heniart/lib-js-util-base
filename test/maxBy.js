'use strict'

const test = require('brittle')
const assert = require('assert')
const maxBy = require('../src/maxBy')

test('maxBy should return item with maximum value by iteratee function', () => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 3 }]
  const result = maxBy(collection, (item) => item.n)
  assert.strictEqual(result.n, 3)
})

test('maxBy should return item with maximum value by path string', () => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 3 }]
  const result = maxBy(collection, 'n')
  assert.strictEqual(result.n, 3)
})

test('maxBy should return undefined for empty collection', () => {
  const result = maxBy([], 'n')
  assert.strictEqual(result, undefined)
})

test('maxBy should return first item when all values are equal', () => {
  const collection = [{ n: 1 }, { n: 1 }, { n: 1 }]
  const result = maxBy(collection, 'n')
  assert.strictEqual(result.n, 1)
})

test('maxBy should handle undefined iteratee', () => {
  const collection = [{ n: 1 }, { n: 2 }, { n: 3 }]
  const result = maxBy(collection, undefined)
  assert.strictEqual(result.n, 1)
})

test('maxBy should handle default collection parameter', () => {
  const result = maxBy(undefined, 'n')
  assert.strictEqual(result, undefined)
})
