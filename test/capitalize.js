'use strict'

const test = require('brittle')
const { capitalize } = require('../index')

test('capitalize should capitalize strings', (t) => {
  t.is(capitalize('foo'), 'Foo')
  t.is(capitalize('foo bAr baZ'), 'Foo bar baz')
  t.is(capitalize('FOo BAr BAz'), 'Foo bar baz')
})

test('capitalize should return empty string for non string argument', (t) => {
  t.is(capitalize({}), '')
  t.is(capitalize([]), '')
  t.is(capitalize(null), '')
  t.is(capitalize(123), '')
  t.is(capitalize(NaN), '')
  t.is(capitalize(undefined), '')
  t.is(capitalize(false), '')
  t.is(capitalize(new Map()), '')
})
