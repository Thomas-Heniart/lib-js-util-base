'use strict'

const test = require('brittle')
const difference = require('../src/difference')

test('difference should return the same array if values is not an array', (t) => {
  const result = difference([1, 2, 3], 'string')
  t.alike(result, [1, 2, 3])
})

test('difference should return the same array if values is not an array', (t) => {
  const result = difference([1, 2, 3], ['string'])
  t.alike(result, [1, 2, 3])
})

test('difference should return the original array if values is an empty array', (t) => {
  const result = difference([1, 2, 3], [])
  t.alike(result, [1, 2, 3])
})

test('difference should return an array of elements that are not in values', (t) => {
  const result = difference([1, 2, 3], [2, 3, 4])
  t.alike(result, [1])
})

test('difference should work with complex values', (t) => {
  const result = difference([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { c: 3 }])
  t.alike(result, [{ b: 2 }])
})
