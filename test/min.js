'use strict'

const test = require('brittle')
const min = require('../src/min')

test('min should return the smallest value from a collection', (t) => {
  const actual = min([4, null, 2, 8, 6])

  t.is(actual, 2)
})

test('min should return `undefined` without arguments', (t) => {
  const actual = min()

  t.is(actual, undefined)
})

test('min should return `undefined` for empty collections', (t) => {
  const sources = [null, undefined, false, 0, NaN, '', Symbol('a'), []]

  for (const source of sources) {
    const actual = min(source)

    t.is(actual, undefined)
  }
})

test('min should return the smallest value from a string collection', (t) => {
  const actual = min(['cd', null, 'ab', 'gh', 'ef'])

  t.is(actual, 'ab')
})
