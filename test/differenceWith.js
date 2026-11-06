'use strict'

const test = require('brittle')
const differenceWith = require('../src/differenceWith.js')
const isEqual = require('../src/isEqual')
const assert = require('assert')

test('differenceWith should return a new array with unique values, using a comparator function', () => {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }, 1, 2, 3]
  const other = [{ a: 1 }, { a: 2 }, 2, 3]
  const result = differenceWith(array, other, (arr, values) => arr === values)
  assert.deepStrictEqual(result, [{ a: 1 }, { a: 2 }, { a: 3 }, 1])

  assert.deepStrictEqual(differenceWith(array, other, isEqual), [{ a: 3 }, 1])
})

test('differenceWith should return the same array if values is not an array', () => {
  const result = differenceWith([1, 2, 3], 'string', (arr, values) => arr === values)
  assert.deepStrictEqual(result, [1, 2, 3])
})

test('differenceWith should return the empty array if first argument is not an array', () => {
  const result = differenceWith('string', [1, 2, 3], (arr, values) => arr === values)
  assert.deepStrictEqual(result, [])
})

test('differenceWith should use strict equality if comparator is not a function', () => {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }, 1, 2, 3]
  const other = [{ a: 1 }, { a: 2 }, 2, 3]
  const result = differenceWith(array, other)
  assert.deepStrictEqual(result, [{ a: 1 }, { a: 2 }, { a: 3 }, 1])
})
