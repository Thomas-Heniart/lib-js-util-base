'use strict'

const test = require('brittle')
const { sum } = require('../index')

test('sum should return a sum of array items', (t) => {
  t.is(sum([1, 2, 3]), 6)
})

test('sum should return 0 if argument is not array', (t) => {
  t.is(sum({}), 0)
  t.is(sum(null), 0)
  t.is(sum(), 0)
  t.is(sum('foo'), 0)
})
