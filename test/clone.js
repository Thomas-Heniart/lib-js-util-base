'use strict'

const test = require('brittle')
const assert = require('assert')
const { clone } = require('../index')

test('clone should return a shallow copy of the object', () => {
  const object = { a: 1, b: 2, c: { d: 3, e: { f: '5' } } }
  const cloned = clone(object)
  assert.deepStrictEqual(cloned, object)
  assert.notStrictEqual(cloned, object)
  assert.strictEqual(cloned.c, object.c)
  assert.strictEqual(cloned.c.e, object.c.e)
})

test('clone should work with arrays', () => {
  const array = [1, 2, 3, { a: 1 }]
  const cloned = clone(array)
  assert.deepStrictEqual(cloned, array)
  assert.notStrictEqual(cloned, array)
  assert.strictEqual(cloned[3], array[3])
})

test('clone should handle edge cases', () => {
  assert.deepStrictEqual(clone(), undefined)
  assert.deepStrictEqual(clone(null), null)
  assert.deepStrictEqual(clone(undefined), undefined)
  assert.deepStrictEqual(clone(1), 1)
  assert.deepStrictEqual(clone('a'), 'a')
  assert.deepStrictEqual(clone(true), true)
  assert.deepStrictEqual(clone(false), false)
})
