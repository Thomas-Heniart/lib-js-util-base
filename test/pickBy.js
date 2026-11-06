'use strict'

const test = require('brittle')
const { pickBy } = require('../index')

test('pickBy should return an empty object when input is null', (t) => {
  t.alike(pickBy(null, val => val > 1), {})
})

test('pickBy should return a new object with the properties that satisfy the predicate function', (t) => {
  t.alike(pickBy({ a: 1, b: 2, c: 3 }, val => val > 1), { b: 2, c: 3 })
})

test('pickBy should return an empty object when no properties satisfy the predicate function', (t) => {
  t.alike(pickBy({ a: 1, b: 2, c: 3 }, val => val > 3), {})
})

test('pickBy should return an empty object for an empty input object', (t) => {
  t.alike(pickBy({}, val => val > 1), {})
})

test('pickBy should consider both value and key in the predicate function', (t) => {
  t.alike(pickBy({ a: 1, b: 2, c: 3 }, (val, key) => key === 'b' || val > 2), { b: 2, c: 3 })
})

test('pickBy predicate could be simple constructor as well', (t) => {
  t.alike(pickBy({ a: 1, b: 0, c: 3, d: null, e: false, f: true }, Boolean), { a: 1, c: 3, f: true })
})
