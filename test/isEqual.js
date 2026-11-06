'use strict'

const test = require('brittle')
const assert = require('assert')
const isEqual = require('../src/isEqual')

test('isEqual should return true for equal primitives', () => {
  assert.ok(isEqual(5, 5))
  assert.ok(isEqual('foo', 'foo'))
  assert.ok(isEqual(true, true))
  assert.ok(isEqual(null, null))
})

test('isEqual should return false for not equal values with the same type', () => {
  assert.ok(!isEqual(5, 6))
  assert.ok(!isEqual('foo', 'bar'))
  assert.ok(!isEqual(true, false))
})

test('isEqual should return true for the same oject reference', () => {
  const objToCompare = { foo: 'bar' }

  assert.ok(isEqual(objToCompare, objToCompare))
})

test('isEqual should return true for the equal objects', () => {
  const objToCompare = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }
  const otherObj = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }

  assert.ok(isEqual(objToCompare, otherObj))
})

test('isEqual should return false if objects are different', () => {
  const objToCompare = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }
  const otherObj = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 2 }] } }

  assert.ok(!isEqual(objToCompare, otherObj))
})

test('isEqual should return false if objects has different number of properties', () => {
  const objToCompare = { foo: 'bar', baz: [1, 2, 3], qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }
  const otherObj = { foo: 'bar', qux: { quux: 1, corge: 'grault', garply: ['waldo', 'fred', { plugh: 'xyzzy', thud: 1 }] } }

  assert.ok(!isEqual(objToCompare, otherObj))
})

test('isEqual should return true for equal flat arrays', () => {
  const arr1 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
  const arr2 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']

  assert.ok(isEqual(arr1, arr2))
})

test('isEqual should return false for different arrays', () => {
  const arr1 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
  const arr2 = ['foo', 'bar', 'baz', 'qux', 'quun', 'quuz']

  assert.ok(!isEqual(arr1, arr2))
})

test('isEqual should return false for arrays with different number of items', () => {
  const arr1 = ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
  const arr2 = ['foo', 'bar', 'baz', 'qux', 'quun']

  assert.ok(!isEqual(arr1, arr2))
})

test('isEqual should return true for complexly arrays', () => {
  const arr1 = ['foo', ['bar'], ['baz', 'qux'], { quux: 1, quuz: [1, 'a', true] }]
  const arr2 = ['foo', ['bar'], ['baz', 'qux'], { quux: 1, quuz: [1, 'a', true] }]

  assert.ok(isEqual(arr1, arr2))
})

test('isEqual should compare regexes', () => {
  assert.ok(isEqual(/asd/gim, /asd/gim))
  assert.ok(!isEqual(/asd/gi, /asd/g))
  assert.ok(!isEqual(/asd/, /asf/))
  assert.strictEqual(
    isEqual(/x/g, { global: true, ignoreCase: false, multiline: false, source: 'x' }),
    false
  )
})

test('isEqual should return false for comparsion of items with different types', () => {
  assert.ok(!isEqual(1, '1'))
  assert.ok(!isEqual(1, { }))
  assert.ok(!isEqual(false, '5'))
})

test('isEqual should return true for nested equal arrays', () => {
  const nesrtedArray = [1, 2, 3]
  assert.ok(isEqual({ a: [1, 2, nesrtedArray] }, { a: [1, 2, nesrtedArray] }))
})

test('isEqual should return false if nested one of nestd item is not array', () => {
  assert.ok(!isEqual({ a: [1, 2, [3]] }, { a: [1, 2, 3] }))
})
