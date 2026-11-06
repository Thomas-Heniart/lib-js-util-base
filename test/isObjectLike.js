'use strict'

const test = require('brittle')
const { isObjectLike } = require('../index')

test('isObjectLike should return true', (t) => {
  t.ok(isObjectLike({}))
  t.ok(isObjectLike([]))
  t.ok(isObjectLike(new Date()))
  t.ok(isObjectLike(/a/g))
  t.ok(isObjectLike(new Error()))
  t.ok(isObjectLike(new Set()))
  t.ok(isObjectLike(new Map()))
  t.ok(isObjectLike(new WeakSet()))
  t.ok(isObjectLike(new WeakMap()))
})

test('isObjectLike should return false', (t) => {
  t.ok(!isObjectLike(null))
  t.ok(!isObjectLike(undefined))
  t.ok(!isObjectLike(1))
  t.ok(!isObjectLike('a'))
  t.ok(!isObjectLike(true))
  t.ok(!isObjectLike(false))
  t.ok(!isObjectLike(Symbol('a')))
  t.ok(!isObjectLike(() => {}))
})
