'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const mapValues = require('../src/mapValues')

const array = [1, 2]
const object = { a: 1, b: 2 }

test('mapValues should map values in `object` to a new object', (t) => {
  const actual = mapValues(object, String)
  alikePlain(t, actual, { a: '1', b: '2' })
})

test('mapValues should treat arrays like objects', (t) => {
  const actual = mapValues(array, String)
  alikePlain(t, actual, { 0: '1', 1: '2' })
})

test('mapValues should work with `_.property` shorthands', (t) => {
  const actual = mapValues({ a: { b: 2 } }, 'b')
  alikePlain(t, actual, { a: 2 })
})
