'use strict'

const test = require('brittle')
const isBoolean = require('../src/isBoolean')

test('isBoolean should return true for true', (t) => {
  t.is(isBoolean(true), true)
})

test('isBoolean should return true for false', (t) => {
  t.is(isBoolean(false), true)
})

test('isBoolean should return false for string', (t) => {
  t.is(isBoolean('true'), false)
})

test('isBoolean should return false for number', (t) => {
  t.is(isBoolean(1), false)
})

test('isBoolean should return false for null', (t) => {
  t.is(isBoolean(null), false)
})

test('isBoolean should return false for undefined', (t) => {
  t.is(isBoolean(undefined), false)
})
