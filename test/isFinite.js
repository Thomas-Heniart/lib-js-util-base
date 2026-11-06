'use strict'

const test = require('brittle')
/* eslint-disable no-new-wrappers */

const { isFinite } = require('../index')

test('isFinite should return true for a positive number', (t) => {
  t.ok(isFinite(42))
})

test('isFinite should return true for a negative number', (t) => {
  t.ok(isFinite(-5))
})

test('isFinite should return true for zero', (t) => {
  t.ok(isFinite(0))
})

test('isFinite should return true for bigNumbers', (t) => {
  t.ok(isFinite(Number.MAX_SAFE_INTEGER))
  t.ok(isFinite(Number.MAX_SAFE_INTEGER + 1))
  t.ok(isFinite(Number.MIN_SAFE_INTEGER))
  t.ok(isFinite(Number.MIN_SAFE_INTEGER - 1))
})

test('isFinite should return FALSE for a constructed number ', (t) => {
  t.ok(!isFinite(new Number(54)))
})

test('isFinite should return FALSE for NaN and infinity', (t) => {
  t.ok(!isFinite(NaN))
  t.ok(!isFinite(Number.NEGATIVE_INFINITY))
  t.ok(!isFinite(Number.POSITIVE_INFINITY))
})

test('isFinite should return FALSE for any other primitive', (t) => {
  t.ok(!isFinite('hello'))
  t.ok(!isFinite([1, 2, 3]))
  t.ok(!isFinite({ key: 'value' }))
  t.ok(!isFinite(true))
  t.ok(!isFinite(null))
  t.ok(!isFinite(undefined))
})
