'use strict'

const test = require('brittle')
const { clone } = require('../index')

test('clone should return a shallow copy of the object', (t) => {
  const object = { a: 1, b: 2, c: { d: 3, e: { f: '5' } } }
  const cloned = clone(object)
  t.alike(cloned, object)
  t.not(cloned, object)
  t.is(cloned.c, object.c)
  t.is(cloned.c.e, object.c.e)
})

test('clone should work with arrays', (t) => {
  const array = [1, 2, 3, { a: 1 }]
  const cloned = clone(array)
  t.alike(cloned, array)
  t.not(cloned, array)
  t.is(cloned[3], array[3])
})

test('clone should handle edge cases', (t) => {
  t.alike(clone(), undefined)
  t.alike(clone(null), null)
  t.alike(clone(undefined), undefined)
  t.alike(clone(1), 1)
  t.alike(clone('a'), 'a')
  t.alike(clone(true), true)
  t.alike(clone(false), false)
})
