'use strict'

const test = require('brittle')
const assert = require('assert')
const { isMatch } = require('../index')

test('isMatch should match two objects', () => {
  const object = { a: 1, b: 2, c: { d: 3 } }
  assert.ok(isMatch(object, { a: 1 }))
  assert.ok(isMatch(object, { b: 2 }))
  assert.ok(isMatch(object, { c: { d: 3 } }))
  assert.ok(!isMatch(object, { c: 3 }))
  assert.ok(!isMatch(object, { c: { e: 3 } }))
  assert.ok(!isMatch(object, { c: { d: 4 } }))
  assert.ok(isMatch(object, { a: 1, b: 2 }))
  assert.ok(!isMatch(object, { a: 2 }))
  assert.ok(!isMatch(object, { a: { b: 2 } }))
  assert.ok(!isMatch(object, [1, 2, 3]))
})

test('isMatch should match two arrays', () => {
  const arr = [1, 2, '3', { a: 1 }]
  assert.ok(isMatch(arr, [1, 2, '3', { a: 1 }]))
  assert.ok(!isMatch(arr, [1, 2, '3', { a: 2 }]))
  assert.ok(!isMatch(arr, [1, 2, '3', { b: 1 }]))
  assert.ok(isMatch(arr, { 0: 1, 1: 2, 2: '3' }))
  assert.ok(isMatch(arr, [1, 2, '3']))
  assert.ok(!isMatch(arr, [1, 2, { a: 1 }]))
  assert.ok(!isMatch(arr, [1, 2, 3]))
  assert.ok(!isMatch(arr, 1))
  assert.ok(!isMatch(arr, {}))
})

test('isMatch should match two strings', () => {
  const str = 'abc'
  assert.ok(isMatch(str, 'abc'))
  assert.ok(isMatch(str, 'ab'))
  assert.ok(isMatch(str, 'a'))
  assert.ok(!isMatch(str, 'abcd'))
  assert.ok(!isMatch(str, 'abd'))
  assert.ok(!isMatch({}, 'abc'))
})

test('isMatch should return true if source is not defined', () => {
  const num = 123
  assert.ok(isMatch(num))
})
