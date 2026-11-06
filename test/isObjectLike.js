'use strict'

const test = require('brittle')
const assert = require('assert')
const { isObjectLike } = require('../index')

test('isObjectLike should return true', () => {
  assert.ok(isObjectLike({}))
  assert.ok(isObjectLike([]))
  assert.ok(isObjectLike(new Date()))
  assert.ok(isObjectLike(/a/g))
  assert.ok(isObjectLike(new Error()))
  assert.ok(isObjectLike(new Set()))
  assert.ok(isObjectLike(new Map()))
  assert.ok(isObjectLike(new WeakSet()))
  assert.ok(isObjectLike(new WeakMap()))
})

test('isObjectLike should return false', () => {
  assert.ok(!isObjectLike(null))
  assert.ok(!isObjectLike(undefined))
  assert.ok(!isObjectLike(1))
  assert.ok(!isObjectLike('a'))
  assert.ok(!isObjectLike(true))
  assert.ok(!isObjectLike(false))
  assert.ok(!isObjectLike(Symbol('a')))
  assert.ok(!isObjectLike(() => {}))
})
