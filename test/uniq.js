'use strict'

const test = require('brittle')
const uniq = require('../src/uniq.js')
const assert = require('assert')

test('uniq should return an array with unique elements', () => {
  const arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 6, 6, 6, 3, 2, 4, 1, 2]
  const result = uniq(arr)
  assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6])
})

test('uniq should return an empty array for an empty input array', () => {
  const arr = []
  const result = uniq(arr)
  assert.deepStrictEqual(result, [])
})

test('uniq should return the same array when all elements are unique', () => {
  const arr = [1, 2, 3, 4, 5]
  const result = uniq(arr)
  assert.deepStrictEqual(result, [1, 2, 3, 4, 5])
})
