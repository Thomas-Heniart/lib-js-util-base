'use strict'

const test = require('brittle')

const { uniqWith } = require('../index')
const { isEqual } = require('../index')

test('uniqWith should return a new array with unique values, using a comparator function', (t) => {
  const array = [{ a: 1 }, { a: 2 }, { a: 1 }]
  const comparator = (a, b) => a.a === b.a
  t.alike(uniqWith(array, comparator), [{ a: 1 }, { a: 2 }])
})

test('uniqWith should return a new array with unique values, using a isEqual comparator function', (t) => {
  const array = [{ a: 1 }, { a: 2 }, { a: 1 }]
  t.alike(uniqWith(array, isEqual), [{ a: 1 }, { a: 2 }])
})

test('uniqWith should handle edge cases', (t) => {
  t.alike(uniqWith(), [])
  t.alike(uniqWith([]), [])
  t.alike(uniqWith([1, 2, 3]), [1, 2, 3])
  t.alike(uniqWith([1, 2, 3, 1, 2, 3]), [1, 2, 3, 1, 2, 3])
})
