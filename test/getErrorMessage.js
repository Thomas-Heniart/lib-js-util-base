'use strict'

const test = require('brittle')
const getErrorMessage = require('../src/getErrorMessage')

test('getErrorMessage should return the error message when it exists', (t) => {
  const error = new Error('Something went wrong')
  const errorMessage = getErrorMessage(error)
  t.is(errorMessage, 'Something went wrong')
})

test('getErrorMessage should return an empty string when the error message is not provided', (t) => {
  const error = new Error()
  const errorMessage = getErrorMessage(error)
  t.is(errorMessage, '')
})

test('getErrorMessage should return the base error code when it exists', (t) => {
  const error = new Error('foo bar ERR_INVALID_INPUT')
  const errorMessage = getErrorMessage(error)
  t.is(errorMessage, 'ERR_INVALID_INPUT')
})

test('getErrorMessage should return the full error message when it does not match the base error code pattern', (t) => {
  const error = new Error('Some other error')
  const errorMessage = getErrorMessage(error)
  t.is(errorMessage, 'Some other error')
})
