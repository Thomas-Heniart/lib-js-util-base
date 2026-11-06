'use strict'

const test = require('brittle')
const chunk = require('../src/chunk')

test('chunk should chunk array into groups', (t) => {
  const result = chunk([1, 2, 3, 4, 5], 2)
  t.alike(result, [[1, 2], [3, 4], [5]])
})

test('chunk should chunk array into groups if chunk size is string number', (t) => {
  const result = chunk([1, 2, 3, 4, 5], '2')
  t.alike(result, [[1, 2], [3, 4], [5]])
})

test('chunk should return an empty array if the collection is not an array', (t) => {
  const result = chunk(null, 2)
  t.alike(result, [])
})

test('chunk should return an empty array if the chunk size is not a number', (t) => {
  const result = chunk([1, 2, 3], 'test')
  t.alike(result, [])
})

test('chunk should handle empty array', (t) => {
  const result = chunk([])
  t.alike(result, [])
})

test('chunk should handle chunk size larger than array', (t) => {
  const result = chunk([1, 2], 5)
  t.alike(result, [[1, 2]])
})

test('chunk should handle zero chunk size', (t) => {
  const result = chunk([1, 2, 3], 0)
  t.alike(result, [[1], [2], [3]])
})

test('chunk should handle default chunkSize parameter', (t) => {
  const result = chunk([1, 2, 3])
  t.alike(result, [[1], [2], [3]])
})

test('chunk should handle default collection parameter', (t) => {
  const result = chunk(undefined, 2)
  t.alike(result, [])
})
