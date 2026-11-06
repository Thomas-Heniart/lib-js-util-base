'use strict'

const test = require('brittle')
const assert = require('assert')
const isBoolean = require('../src/isBoolean')

test('isBoolean should return true for true', () => {
  assert.strictEqual(isBoolean(true), true)
})

test('isBoolean should return true for false', () => {
  assert.strictEqual(isBoolean(false), true)
})

test('isBoolean should return false for string', () => {
  assert.strictEqual(isBoolean('true'), false)
})

test('isBoolean should return false for number', () => {
  assert.strictEqual(isBoolean(1), false)
})

test('isBoolean should return false for null', () => {
  assert.strictEqual(isBoolean(null), false)
})

test('isBoolean should return false for undefined', () => {
  assert.strictEqual(isBoolean(undefined), false)
})
