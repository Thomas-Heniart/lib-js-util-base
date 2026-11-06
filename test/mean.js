'use strict'

const test = require('brittle')
const { mean } = require('../index')

test('mean should return the mean of an array of numbers', (t) => {
  t.is(mean([2, 3, 4]), 3)
  t.is(mean([2, 3, 4, 5]), 3.5)
})

test('mean should return NaN when the array is empty', (t) => {
  t.ok(isNaN(mean([])))
})

test('mean should return NaN when the array is null or undefined', (t) => {
  t.ok(isNaN(mean(null)))
  t.ok(isNaN(mean(undefined)))
})

test('mean should cast strings to numbers', (t) => {
  t.is(mean(['2', '3', '4']), 3)
  t.is(mean(['2', '3', '4', '5']), 3.5)
})
