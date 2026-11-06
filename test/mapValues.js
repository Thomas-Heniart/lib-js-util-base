'use strict'

const test = require('brittle')
const mapValues = require('../src/mapValues')

const array = [1, 2]
const object = { a: 1, b: 2 }

test('mapValues should map values in `object` to a new object', (t) => {
  const actual = mapValues(object, String)
  t.alike(actual, { a: '1', b: '2' })
})

test('mapValues should treat arrays like objects', (t) => {
  const actual = mapValues(array, String)
  t.alike(actual, { 0: '1', 1: '2' })
})

test('mapValues should work with `_.property` shorthands', (t) => {
  const actual = mapValues({ a: { b: 2 } }, 'b')
  t.alike(actual, { a: 2 })
})
