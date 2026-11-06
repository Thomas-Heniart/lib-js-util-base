'use strict'

const test = require('brittle')
const isUndefined = require('../src/isUndefined')

test('isUndefined should return true for undefined', (t) => {
  t.ok(isUndefined(undefined))
})

test('isUndefined should return true for no param', (t) => {
  t.ok(isUndefined())
})

test('isUndefined should return false for empty object', (t) => {
  t.is(isUndefined({}), false)
})

test('isUndefined should return false for empty array', (t) => {
  t.is(isUndefined([]), false)
})

test('isUndefined should return false for null', (t) => {
  t.is(isUndefined(null), false)
})

test('isUndefined should return false for false', (t) => {
  t.is(isUndefined(false), false)
})

test('isUndefined should return false for empty string', (t) => {
  t.is(isUndefined(''), false)
})

test('isUndefined should return false for zero', (t) => {
  t.is(isUndefined(0), false)
})
