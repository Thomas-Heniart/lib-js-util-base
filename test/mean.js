'use strict'

const test = require('brittle')
const assert = require('assert')
const { mean } = require('../index')

test('mean should return the mean of an array of numbers', () => {
  assert.strictEqual(mean([2, 3, 4]), 3)
  assert.strictEqual(mean([2, 3, 4, 5]), 3.5)
})

test('mean should return NaN when the array is empty', () => {
  assert(isNaN(mean([])))
})

test('mean should return NaN when the array is null or undefined', () => {
  assert(isNaN(mean(null)))
  assert(isNaN(mean(undefined)))
})

test('mean should cast strings to numbers', () => {
  assert.strictEqual(mean(['2', '3', '4']), 3)
  assert.strictEqual(mean(['2', '3', '4', '5']), 3.5)
})
