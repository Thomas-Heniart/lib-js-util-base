'use strict'

const test = require('brittle')
/* eslint-disable no-new-wrappers */

const assert = require('assert')
const { isFinite } = require('../index')

test('isFinite should return true for a positive number', () => {
  assert.ok(isFinite(42))
})

test('isFinite should return true for a negative number', () => {
  assert.ok(isFinite(-5))
})

test('isFinite should return true for zero', () => {
  assert.ok(isFinite(0))
})

test('isFinite should return true for bigNumbers', () => {
  assert.ok(isFinite(Number.MAX_SAFE_INTEGER))
  assert.ok(isFinite(Number.MAX_SAFE_INTEGER + 1))
  assert.ok(isFinite(Number.MIN_SAFE_INTEGER))
  assert.ok(isFinite(Number.MIN_SAFE_INTEGER - 1))
})

test('isFinite should return FALSE for a constructed number ', () => {
  assert.ok(!isFinite(new Number(54)))
})

test('isFinite should return FALSE for NaN and infinity', () => {
  assert.ok(!isFinite(NaN))
  assert.ok(!isFinite(Number.NEGATIVE_INFINITY))
  assert.ok(!isFinite(Number.POSITIVE_INFINITY))
})

test('isFinite should return FALSE for any other primitive', () => {
  assert.ok(!isFinite('hello'))
  assert.ok(!isFinite([1, 2, 3]))
  assert.ok(!isFinite({ key: 'value' }))
  assert.ok(!isFinite(true))
  assert.ok(!isFinite(null))
  assert.ok(!isFinite(undefined))
})
