'use strict'

const test = require('brittle')
const isEqual = require('../src/isEqual')

test('isEqual should return true for equal primitives', (t) => {
  t.ok(isEqual(5, 5))
  t.ok(isEqual('foo', 'foo'))
  t.ok(isEqual(true, true))
  t.ok(isEqual(null, null))
})

test('isEqual should return false for not equal values with the same type', (t) => {
  t.ok(!isEqual(5, 6))
  t.ok(!isEqual('foo', 'bar'))
  t.ok(!isEqual(true, false))
})

test('isEqual should return true for the same oject reference', (t) => {
  const objToCompare = { foo: 'bar' }

  t.ok(isEqual(objToCompare, objToCompare))
})

test('isEqual should return true for the equal objects', (t) => {
  const objToCompare = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }
  const otherObj = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }

  t.ok(isEqual(objToCompare, otherObj))
})

test('isEqual should return false if objects are different', (t) => {
  const objToCompare = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }
  const otherObj = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 2 }] } }

  t.ok(!isEqual(objToCompare, otherObj))
})

test('isEqual should return false if objects has different number of properties', (t) => {
  const objToCompare = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }
  const otherObj = { foo: 'bar', qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }

  t.ok(!isEqual(objToCompare, otherObj))
})

test('isEqual should return true for equal flat arrays', (t) => {
  const arr1 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
  const arr2 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']

  t.ok(isEqual(arr1, arr2))
})

test('isEqual should return false for different arrays', (t) => {
  const arr1 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
  const arr2 = ['foo', 'bar', 'baz', 'qux', 'quun', 'quuz']

  t.ok(!isEqual(arr1, arr2))
})

test('isEqual should return false for arrays with different number of items', (t) => {
  const arr1 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
  const arr2 = ['foo', 'bar', 'baz', 'qux', 'quun']

  t.ok(!isEqual(arr1, arr2))
})

test('isEqual should return true for complexly arrays', (t) => {
  const arr1 = ['foo', ['bar'], ['baz', 'qux'], { quux: 1, quuz: [1, 'a', true] }]
  const arr2 = ['foo', ['bar'], ['baz', 'qux'], { quux: 1, quuz: [1, 'a', true] }]

  t.ok(isEqual(arr1, arr2))
})

test('isEqual should compare regexes', (t) => {
  t.ok(isEqual(/asd/gim, /asd/gim))
  t.ok(!isEqual(/asd/gi, /asd/g))
  t.ok(!isEqual(/asd/, /asf/))
  t.is(
    isEqual(/x/g, { global: true, ignoreCase: false, multiline: false, source: 'x' }),
    false
  )
})

test('isEqual should return false for comparsion of items with different types', (t) => {
  t.ok(!isEqual(1, '1'))
  t.ok(!isEqual(1, { }))
  t.ok(!isEqual(false, '5'))
})

test('isEqual should return true for nested equal arrays', (t) => {
  const nesrtedArray = [1, 2, 3]
  t.ok(isEqual({ a: [1, 2, nesrtedArray] }, { a: [1, 2, nesrtedArray] }))
})

test('isEqual should return false if nested one of nestd item is not array', (t) => {
  t.ok(!isEqual({ a: [1, 2, [3]] }, { a: [1, 2, 3] }))
})
