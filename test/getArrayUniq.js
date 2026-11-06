'use strict'

const test = require('brittle')
const assert = require('assert')
const { getArrayUniq } = require('../index')

test('getArrayUniq should return an array with unique elements', () => {
  const arr = [1, 2, 3, 4, 4, 3, 2, 1]
  const expected = [1, 2, 3, 4]
  assert.deepStrictEqual(getArrayUniq(arr), expected)
})

test('getArrayUniq should return an empty array for an empty input array', () => {
  const arr = []
  const expected = []
  assert.deepStrictEqual(getArrayUniq(arr), expected)
})

test('getArrayUniq should return the same array when all elements are unique', () => {
  const arr = [1, 2, 3, 4]
  const expected = [1, 2, 3, 4]
  assert.deepStrictEqual(getArrayUniq(arr), expected)
})

test('getArrayUniq should handle arrays with elements of different types', () => {
  const arr = [1, '1', 2, '2', 1]
  const expected = [1, '1', 2, '2']
  assert.deepStrictEqual(getArrayUniq(arr), expected)
})
