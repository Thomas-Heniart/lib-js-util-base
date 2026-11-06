'use strict'

const test = require('brittle')
const uniq = require('../src/uniq.js')

test('uniq should return an array with unique elements', (t) => {
  const arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 6, 6, 6, 3, 2, 4, 1, 2]
  const result = uniq(arr)
  t.alike(result, [1, 2, 3, 4, 5, 6])
})

test('uniq should return an empty array for an empty input array', (t) => {
  const arr = []
  const result = uniq(arr)
  t.alike(result, [])
})

test('uniq should return the same array when all elements are unique', (t) => {
  const arr = [1, 2, 3, 4, 5]
  const result = uniq(arr)
  t.alike(result, [1, 2, 3, 4, 5])
})
