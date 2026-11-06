'use strict'

const test = require('brittle')
const assert = require('assert')

const { uniqWith } = require('../index')
const { isEqual } = require('../index')

test('uniqWith should return a new array with unique values, using a comparator function', () => {
  const array = [{ a: 1 }, { a: 2 }, { a: 1 }]
  const comparator = (a, b) => a.a === b.a
  assert.deepStrictEqual(uniqWith(array, comparator), [{ a: 1 }, { a: 2 }])
})

test('uniqWith should return a new array with unique values, using a isEqual comparator function', () => {
  const array = [{ a: 1 }, { a: 2 }, { a: 1 }]
  assert.deepStrictEqual(uniqWith(array, isEqual), [{ a: 1 }, { a: 2 }])
})

test('uniqWith should handle edge cases', () => {
  assert.deepStrictEqual(uniqWith(), [])
  assert.deepStrictEqual(uniqWith([]), [])
  assert.deepStrictEqual(uniqWith([1, 2, 3]), [1, 2, 3])
  assert.deepStrictEqual(uniqWith([1, 2, 3, 1, 2, 3]), [1, 2, 3, 1, 2, 3])
})
