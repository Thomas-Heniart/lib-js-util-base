'use strict'

const test = require('brittle')
const max = require('../src/max')

test('max should return the largest value from a collection', (t) => {
  const actual = max([4, null, 2, 8, 6])

  t.is(actual, 8)
})

test('max should return `undefined` without arguments', (t) => {
  const actual = max()

  t.is(actual, undefined)
})

test('max should return `undefined` for empty collections', (t) => {
  const sources = [null, undefined, false, 0, NaN, '', Symbol('a'), []]

  for (const source of sources) {
    const actual = max(source)

    t.is(actual, undefined)
  }
})

test('max should return the largest value from a string collection', (t) => {
  const actual = max(['cd', null, 'ab', 'gh', 'ef'])

  t.is(actual, 'gh')
})
