'use strict'

const test = require('brittle')
const { getArrayUniq } = require('../index')

test('getArrayUniq should return an array with unique elements', (t) => {
  const arr = [1, 2, 3, 4, 4, 3, 2, 1]
  const expected = [1, 2, 3, 4]
  t.alike(getArrayUniq(arr), expected)
})

test('getArrayUniq should return an empty array for an empty input array', (t) => {
  const arr = []
  const expected = []
  t.alike(getArrayUniq(arr), expected)
})

test('getArrayUniq should return the same array when all elements are unique', (t) => {
  const arr = [1, 2, 3, 4]
  const expected = [1, 2, 3, 4]
  t.alike(getArrayUniq(arr), expected)
})

test('getArrayUniq should handle arrays with elements of different types', (t) => {
  const arr = [1, '1', 2, '2', 1]
  const expected = [1, '1', 2, '2']
  t.alike(getArrayUniq(arr), expected)
})
