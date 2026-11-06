'use strict'

const test = require('brittle')
const upperFirst = require('../src/upperFirst')

test('upperFirst should capitalize first character', (t) => {
  t.is(upperFirst('foo'), 'Foo')
})

test('upperFirst should keep the string as is if already capitalized', (t) => {
  t.is(upperFirst('FRED'), 'FRED')
})

test('upperFirst should handle empty string', (t) => {
  t.is(upperFirst(''), '')
})

test('upperFirst should handle already capitalized string', (t) => {
  t.is(upperFirst('Foo'), 'Foo')
})

test('upperFirst should handle single character', (t) => {
  t.is(upperFirst('f'), 'F')
})

test('upperFirst should handle number input', (t) => {
  t.is(upperFirst(123), '123')
})

test('upperFirst should handle array input', (t) => {
  t.is(upperFirst([]), '')
})

test('upperFirst should handle boolean input', (t) => {
  t.is(upperFirst(true), 'True')
  t.is(upperFirst(false), 'False')
})

test('upperFirst should handle object input', (t) => {
  t.is(upperFirst({}), '[object Object]')
})

test('upperFirst should handle Set input', (t) => {
  t.is(upperFirst(new Set()), '[object Set]')
})

test('upperFirst should handle Symbol input', (t) => {
  t.is(upperFirst(Symbol('abc')), 'Symbol(abc)')
})

test('upperFirst should handle null input', (t) => {
  t.is(upperFirst(null), 'Null')
})

test('upperFirst should handle undefined input', (t) => {
  t.is(upperFirst(undefined), '')
})

test('upperFirst should handle NaN input', (t) => {
  t.is(upperFirst(NaN), 'NaN')
})
