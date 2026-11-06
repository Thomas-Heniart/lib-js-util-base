'use strict'

const test = require('brittle')
/* eslint-disable no-new-wrappers */

const assert = require('assert')
const { isNumber } = require('../index')

test('isNumber should return TRUE for a positive number', () => {
  assert.ok(isNumber(42))
  assert.ok(isNumber(42.25))
})

test('isNumber should return TRUE for a negative number', () => {
  assert.ok(isNumber(-5))
  assert.ok(isNumber(-5.12))
})

test('isNumber should return TRUE for zero', () => {
  assert.ok(isNumber(0))
})

test('isNumber should return TRUE for bigNumbers', () => {
  assert.ok(isNumber(Number.MAX_SAFE_INTEGER))
  assert.ok(isNumber(Number.MAX_SAFE_INTEGER + 1))
  assert.ok(isNumber(Number.MIN_SAFE_INTEGER))
  assert.ok(isNumber(Number.MIN_SAFE_INTEGER - 1))
})

test('isNumber should return TRUE for NaN and infinity', () => {
  assert.ok(isNumber(NaN))
  assert.ok(isNumber(Number.NEGATIVE_INFINITY))
  assert.ok(isNumber(Number.POSITIVE_INFINITY))
})

test('isNumber should return FALSE for a constructed number ', () => {
  assert.ok(!isNumber(new Number(54)))
})

test('isNumber should return FALSE for any other primitive', () => {
  assert.ok(!isNumber('hello'))
  assert.ok(!isNumber([1, 2, 3]))
  assert.ok(!isNumber({ key: 'value' }))
  assert.ok(!isNumber(true))
  assert.ok(!isNumber(null))
  assert.ok(!isNumber(undefined))
})
