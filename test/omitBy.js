'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const { omitBy } = require('../index')

test('omitBy should return an empty object when input is null', (t) => {
  alikePlain(t, omitBy(null, val => val > 1), {})
})

test('omitBy should return a new object with the properties that satisfy the predicate function', (t) => {
  alikePlain(t, omitBy({ a: 1, b: 2, c: 3 }, val => val > 1), { a: 1 })
})

test('omitBy should return the same object when no properties satisfy the predicate function', (t) => {
  alikePlain(t, omitBy({ a: 1, b: 2, c: 3 }, val => val > 3), { a: 1, b: 2, c: 3 })
})

test('omitBy should return an empty object for an empty input object', (t) => {
  alikePlain(t, omitBy({}, val => val > 1), {})
})

test('omitBy should consider both value and key in the predicate function', (t) => {
  alikePlain(t, omitBy({ a: 1, b: 2, c: 3 }, (val, key) => key === 'b' || val > 2), { a: 1 })
})

test('omitBy predicate could be simple constructor as well', (t) => {
  alikePlain(t, omitBy({ a: 1, b: 0, c: 3, d: null, e: false, f: true }, Boolean), { b: 0, d: null, e: false })
})
