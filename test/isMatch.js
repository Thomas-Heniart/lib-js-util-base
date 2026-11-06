'use strict'

const test = require('brittle')
const { isMatch } = require('../index')

test('isMatch should match two objects', (t) => {
  const object = { a: 1, b: 2, c: { d: 3 } }
  t.ok(isMatch(object, { a: 1 }))
  t.ok(isMatch(object, { b: 2 }))
  t.ok(isMatch(object, { c: { d: 3 } }))
  t.ok(!isMatch(object, { c: 3 }))
  t.ok(!isMatch(object, { c: { e: 3 } }))
  t.ok(!isMatch(object, { c: { d: 4 } }))
  t.ok(isMatch(object, { a: 1, b: 2 }))
  t.ok(!isMatch(object, { a: 2 }))
  t.ok(!isMatch(object, { a: { b: 2 } }))
  t.ok(!isMatch(object, [1, 2, 3]))
})

test('isMatch should match two arrays', (t) => {
  const arr = [1, 2, '3', { a: 1 }]
  t.ok(isMatch(arr, [1, 2, '3', { a: 1 }]))
  t.ok(!isMatch(arr, [1, 2, '3', { a: 2 }]))
  t.ok(!isMatch(arr, [1, 2, '3', { b: 1 }]))
  t.ok(isMatch(arr, { 0: 1, 1: 2, 2: '3' }))
  t.ok(isMatch(arr, [1, 2, '3']))
  t.ok(!isMatch(arr, [1, 2, { a: 1 }]))
  t.ok(!isMatch(arr, [1, 2, 3]))
  t.ok(!isMatch(arr, 1))
  t.ok(!isMatch(arr, {}))
})

test('isMatch should match two strings', (t) => {
  const str = 'abc'
  t.ok(isMatch(str, 'abc'))
  t.ok(isMatch(str, 'ab'))
  t.ok(isMatch(str, 'a'))
  t.ok(!isMatch(str, 'abcd'))
  t.ok(!isMatch(str, 'abd'))
  t.ok(!isMatch({}, 'abc'))
})

test('isMatch should return true if source is not defined', (t) => {
  const num = 123
  t.ok(isMatch(num))
})
