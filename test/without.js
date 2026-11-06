'use strict'

const test = require('brittle')
const without = require('../src/without')

test('without should return the same array if no values are provided', (t) => {
  const result = without([1, 2, 3])
  t.alike(result, [1, 2, 3])
})

test('without should return the original array if no values are provided', (t) => {
  const result = without([1, 2, 3], 4, 5, 6)
  t.alike(result, [1, 2, 3])
})

test('without should return an array without the provided values', (t) => {
  const result = without([1, 2, 3], 2, 3)
  t.alike(result, [1])
})

test('without should work with complex values', (t) => {
  const result = without([{ a: 1 }, { b: 2 }, { c: 3 }], { a: 1 }, { c: 3 })
  t.alike(result, [{ b: 2 }])
})

test('without should return an empty array if the first argument is not an array', (t) => {
  const result = without('string', 1, 2, 3)
  t.alike(result, [])
})
