'use strict'

const test = require('brittle')
const assert = require('assert')
const { findLastIndex } = require('../index')

test('findLastIndex should return the index of the last element that satisfies the predicate', () => {
  const array = [1, 2, 3, 4, 5]
  assert.strictEqual(findLastIndex(array, (n) => n % 2 === 0), 3)
  assert.strictEqual(findLastIndex(array, (n) => n % 2 === 1), 4)
  assert.strictEqual(findLastIndex(array, (n) => n === 6), -1)
})

test('findLastIndex should return the last index of the complex element that satisfies the predicate', () => {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }]
  assert.strictEqual(findLastIndex(array, (n) => n.a % 2 === 0), 3)
  assert.strictEqual(findLastIndex(array, (n) => n.a % 2 === 1), 4)
  assert.strictEqual(findLastIndex(array, (n) => n.a === 6), -1)
})

test('findLastIndex should allow to use last index as a starting point', () => {
  const array = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2]
  assert.strictEqual(findLastIndex(array, (n) => n === 2), 9)
  assert.strictEqual(findLastIndex(array, (n) => n === 2, 8), 1)
  assert.strictEqual(findLastIndex(array, (n) => n === 6, 4), -1)
})
