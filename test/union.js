'use strict'

const test = require('brittle')
const { union } = require('../index')

test('union should return the union of the arrays', (t) => {
  t.alike(union([2], [1, 2]), [2, 1])
  t.alike(union([1, 2], [2, 3]), [1, 2, 3])
  t.alike(union([1, 2], [3, 4]), [1, 2, 3, 4])
  t.alike(union([1, 2], [3, 4], [5, 6]), [1, 2, 3, 4, 5, 6])
  t.alike(union([1, 2], [2, 3], [3, 4]), [1, 2, 3, 4])
})

test('union should return an empty array', (t) => {
  t.alike(union(), [])
  t.alike(union([]), [])
  t.alike(union([], []), [])
})

test('union should skip non array arguments', (t) => {
  t.alike(union([1, 2], { a: 1 }, [3]), [1, 2, 3])
})
