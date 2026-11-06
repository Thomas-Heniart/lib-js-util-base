'use strict'

const test = require('brittle')
const assert = require('assert')
const chunk = require('../src/chunk')

test('chunk should chunk array into groups', () => {
  const result = chunk([1, 2, 3, 4, 5], 2)
  assert.deepStrictEqual(result, [[1, 2], [3, 4], [5]])
})

test('chunk should chunk array into groups if chunk size is string number', () => {
  const result = chunk([1, 2, 3, 4, 5], '2')
  assert.deepStrictEqual(result, [[1, 2], [3, 4], [5]])
})

test('chunk should return an empty array if the collection is not an array', () => {
  const result = chunk(null, 2)
  assert.deepStrictEqual(result, [])
})

test('chunk should return an empty array if the chunk size is not a number', () => {
  const result = chunk([1, 2, 3], 'test')
  assert.deepStrictEqual(result, [])
})

test('chunk should handle empty array', () => {
  const result = chunk([])
  assert.deepStrictEqual(result, [])
})

test('chunk should handle chunk size larger than array', () => {
  const result = chunk([1, 2], 5)
  assert.deepStrictEqual(result, [[1, 2]])
})

test('chunk should handle zero chunk size', () => {
  const result = chunk([1, 2, 3], 0)
  assert.deepStrictEqual(result, [[1], [2], [3]])
})

test('chunk should handle default chunkSize parameter', () => {
  const result = chunk([1, 2, 3])
  assert.deepStrictEqual(result, [[1], [2], [3]])
})

test('chunk should handle default collection parameter', () => {
  const result = chunk(undefined, 2)
  assert.deepStrictEqual(result, [])
})
