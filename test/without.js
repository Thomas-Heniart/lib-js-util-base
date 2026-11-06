'use strict'

const test = require('brittle')
const assert = require('assert')
const without = require('../src/without')

test('without should return the same array if no values are provided', () => {
  const result = without([1, 2, 3])
  assert.deepStrictEqual(result, [1, 2, 3])
})

test('without should return the original array if no values are provided', () => {
  const result = without([1, 2, 3], 4, 5, 6)
  assert.deepStrictEqual(result, [1, 2, 3])
})

test('without should return an array without the provided values', () => {
  const result = without([1, 2, 3], 2, 3)
  assert.deepStrictEqual(result, [1])
})

test('without should work with complex values', () => {
  const result = without([{ a: 1 }, { b: 2 }, { c: 3 }], { a: 1 }, { c: 3 })
  assert.deepStrictEqual(result, [{ b: 2 }])
})

test('without should return an empty array if the first argument is not an array', () => {
  const result = without('string', 1, 2, 3)
  assert.deepStrictEqual(result, [])
})
