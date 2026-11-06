'use strict'

const test = require('brittle')
/* eslint-disable no-new-wrappers */

const { isNumber } = require('../index')

test('isNumber should return TRUE for a positive number', (t) => {
  t.ok(isNumber(42))
  t.ok(isNumber(42.25))
})

test('isNumber should return TRUE for a negative number', (t) => {
  t.ok(isNumber(-5))
  t.ok(isNumber(-5.12))
})

test('isNumber should return TRUE for zero', (t) => {
  t.ok(isNumber(0))
})

test('isNumber should return TRUE for bigNumbers', (t) => {
  t.ok(isNumber(Number.MAX_SAFE_INTEGER))
  t.ok(isNumber(Number.MAX_SAFE_INTEGER + 1))
  t.ok(isNumber(Number.MIN_SAFE_INTEGER))
  t.ok(isNumber(Number.MIN_SAFE_INTEGER - 1))
})

test('isNumber should return TRUE for NaN and infinity', (t) => {
  t.ok(isNumber(NaN))
  t.ok(isNumber(Number.NEGATIVE_INFINITY))
  t.ok(isNumber(Number.POSITIVE_INFINITY))
})

test('isNumber should return FALSE for a constructed number ', (t) => {
  t.ok(!isNumber(new Number(54)))
})

test('isNumber should return FALSE for any other primitive', (t) => {
  t.ok(!isNumber('hello'))
  t.ok(!isNumber([1, 2, 3]))
  t.ok(!isNumber({ key: 'value' }))
  t.ok(!isNumber(true))
  t.ok(!isNumber(null))
  t.ok(!isNumber(undefined))
})
