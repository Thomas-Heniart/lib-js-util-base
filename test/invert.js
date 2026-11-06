'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
/* eslint-env jest */

const invert = require('../src/invert')

test('invert should invert an object', (t) => {
  const object = { a: 1, b: 2 }
  const actual = invert(object)

  alikePlain(t, actual, { 1: 'a', 2: 'b' })
  alikePlain(t, invert(actual), { a: '1', b: '2' })
})

test('invert should work with values that shadow keys on `Object.prototype`', (t) => {
  const object = { a: 'hasOwnProperty', b: 'constructor' }
  alikePlain(t, invert(object), { hasOwnProperty: 'a', constructor: 'b' })
})

test('invert should work with an object that has a `length` property', (t) => {
  const object = { 0: 'a', 1: 'b', length: 2 }
  alikePlain(t, invert(object), { a: '0', b: '1', 2: 'length' })
})
