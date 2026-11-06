'use strict'

const test = require('brittle')
const assert = require('assert')
const { sample } = require('../index')

test('sample should return a random item from an array', () => {
  const arr = [1, 2, 3, 4, 5]
  const result = sample(arr)
  assert.ok(arr.includes(result))
})

test('sample should return a random item from an object', () => {
  const obj = { a: 'x', b: 'y', c: 'z' }
  const result = sample(obj)
  assert.ok(Object.values(obj).includes(result))
})

test('sample should return undefined for null input', () => {
  assert.strictEqual(sample(null), undefined)
})

test('sample should return undefined for non-object input (number)', () => {
  assert.strictEqual(sample(42), undefined)
})

test('sample should return undefined for empty array', () => {
  assert.strictEqual(sample([]), undefined)
})

test('sample should return undefined for empty object', () => {
  assert.strictEqual(sample({}), undefined)
})

test('sample should be deterministic under fixed Math.random', () => {
  const originalRandom = Math.random
  Math.random = () => 0
  assert.strictEqual(sample([10, 20, 30]), 10)
  Math.random = originalRandom
})
