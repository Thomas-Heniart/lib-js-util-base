'use strict'

const test = require('brittle')
const { omitBy } = require('../index')

test('omitBy should return an empty object when input is null', (t) => {
  t.alike(omitBy(null, val => val > 1), {})
})

test('omitBy should return a new object with the properties that satisfy the predicate function', (t) => {
  t.alike(omitBy({ a: 1, b: 2, c: 3 }, val => val > 1), { a: 1 })
})

test('omitBy should return the same object when no properties satisfy the predicate function', (t) => {
  t.alike(omitBy({ a: 1, b: 2, c: 3 }, val => val > 3), { a: 1, b: 2, c: 3 })
})

test('omitBy should return an empty object for an empty input object', (t) => {
  t.alike(omitBy({}, val => val > 1), {})
})

test('omitBy should consider both value and key in the predicate function', (t) => {
  t.alike(omitBy({ a: 1, b: 2, c: 3 }, (val, key) => key === 'b' || val > 2), { a: 1 })
})

test('omitBy predicate could be simple constructor as well', (t) => {
  t.alike(omitBy({ a: 1, b: 0, c: 3, d: null, e: false, f: true }, Boolean), { b: 0, d: null, e: false })
})
