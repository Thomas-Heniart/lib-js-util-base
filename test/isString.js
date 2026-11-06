'use strict'

const test = require('brittle')
/* eslint-disable no-new-wrappers */

const { isString } = require('../index')

test('isString should return TRUE for a string', (t) => {
  t.ok(isString('text'))
})

test('isString should return TRUE for an empty string', (t) => {
  t.ok(isString(''))
})

test('isString should return FALSE for a constructed string ', (t) => {
  t.ok(!isString(new String('text')))
})

test('isString should return FALSE for any other primitive', (t) => {
  t.ok(!isString(45))
  t.ok(!isString([1, 2, 3]))
  t.ok(!isString(['1', '2', '3']))
  t.ok(!isString({ key: 'value' }))
  t.ok(!isString(true))
  t.ok(!isString(null))
  t.ok(!isString(undefined))
})
