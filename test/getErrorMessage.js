'use strict'

const test = require('brittle')
const assert = require('assert')
const getErrorMessage = require('../src/getErrorMessage')

test('getErrorMessage should return the error message when it exists', () => {
  const error = new Error('Something went wrong')
  const errorMessage = getErrorMessage(error)
  assert.strictEqual(errorMessage, 'Something went wrong')
})

test('getErrorMessage should return an empty string when the error message is not provided', () => {
  const error = new Error()
  const errorMessage = getErrorMessage(error)
  assert.strictEqual(errorMessage, '')
})

test('getErrorMessage should return the base error code when it exists', () => {
  const error = new Error('foo bar ERR_INVALID_INPUT')
  const errorMessage = getErrorMessage(error)
  assert.strictEqual(errorMessage, 'ERR_INVALID_INPUT')
})

test('getErrorMessage should return the full error message when it does not match the base error code pattern', () => {
  const error = new Error('Some other error')
  const errorMessage = getErrorMessage(error)
  assert.strictEqual(errorMessage, 'Some other error')
})
