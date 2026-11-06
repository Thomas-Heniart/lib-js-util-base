'use strict'

const test = require('brittle')
const { sample } = require('../index')

test('sample should return a random item from an array', (t) => {
  const arr = [1, 2, 3, 4, 5]
  const result = sample(arr)
  t.ok(arr.includes(result))
})

test('sample should return a random item from an object', (t) => {
  const obj = { a: 'x', b: 'y', c: 'z' }
  const result = sample(obj)
  t.ok(Object.values(obj).includes(result))
})

test('sample should return undefined for null input', (t) => {
  t.is(sample(null), undefined)
})

test('sample should return undefined for non-object input (number)', (t) => {
  t.is(sample(42), undefined)
})

test('sample should return undefined for empty array', (t) => {
  t.is(sample([]), undefined)
})

test('sample should return undefined for empty object', (t) => {
  t.is(sample({}), undefined)
})

test('sample should be deterministic under fixed Math.random', (t) => {
  const originalRandom = Math.random
  Math.random = () => 0
  t.is(sample([10, 20, 30]), 10)
  Math.random = originalRandom
})
