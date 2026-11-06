'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const { clone } = require('../index')

test('clone should return a shallow copy of the object', (t) => {
  const object = { a: 1, b: 2, c: { d: 3, e: { f: '5' } } }
  const cloned = clone(object)
  alikePlain(t, cloned, object)
  t.not(cloned, object)
  t.is(cloned.c, object.c)
  t.is(cloned.c.e, object.c.e)
})

test('clone should work with arrays', (t) => {
  const array = [1, 2, 3, { a: 1 }]
  const cloned = clone(array)
  alikePlain(t, cloned, array)
  t.not(cloned, array)
  t.is(cloned[3], array[3])
})

test('clone should handle edge cases', (t) => {
  alikePlain(t, clone(), undefined)
  alikePlain(t, clone(null), null)
  alikePlain(t, clone(undefined), undefined)
  alikePlain(t, clone(1), 1)
  alikePlain(t, clone('a'), 'a')
  alikePlain(t, clone(true), true)
  alikePlain(t, clone(false), false)
})
