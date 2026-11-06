'use strict'

const test = require('brittle')
const assert = require('assert')
const isUndefined = require('../src/isUndefined')

test('isUndefined should return true for undefined', () => {
  assert.ok(isUndefined(undefined))
})

test('isUndefined should return true for no param', () => {
  assert.ok(isUndefined())
})

test('isUndefined should return false for empty object', () => {
  assert.equal(isUndefined({}), false)
})

test('isUndefined should return false for empty array', () => {
  assert.equal(isUndefined([]), false)
})

test('isUndefined should return false for null', () => {
  assert.equal(isUndefined(null), false)
})

test('isUndefined should return false for false', () => {
  assert.equal(isUndefined(false), false)
})

test('isUndefined should return false for empty string', () => {
  assert.equal(isUndefined(''), false)
})

test('isUndefined should return false for zero', () => {
  assert.equal(isUndefined(0), false)
})
