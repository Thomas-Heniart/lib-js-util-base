'use strict'

const test = require('brittle')
const { isObject } = require('../index')

test('isObject should return true for plain object', (t) => {
  const object = { a: 'foo' }
  t.ok(isObject(object))
})

test('isObject should return true for array', (t) => {
  const object = []
  t.ok(isObject(object))
})

test('isObject should return true for result of any constructor', (t) => {
  t.ok(isObject(new Set()))
  t.ok(isObject(new Promise(() => {})))
  t.ok(isObject(new Map()))
  t.ok(isObject(new RegExp()))
})

test('isObject should return false for null and primitives', (t) => {
  t.ok(!isObject(null))
  t.ok(!isObject('foo'))
  t.ok(!isObject(123456))
  t.ok(!isObject(true))
  t.ok(!isObject(undefined))
})
