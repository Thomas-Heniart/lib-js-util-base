'use strict'

const test = require('brittle')
const flow = require('../src/flow')

test('flow should return the input argument if no functions are provided', (t) => {
  const result = flow()('input')
  t.is(result, 'input')
})

test('flow should apply the provided functions in sequence', (t) => {
  const addOne = (num) => num + 1
  const double = (num) => num * 2
  const subtractFive = (num) => num - 5

  const result = flow([addOne, double, subtractFive])(10)
  t.is(result, 17)
})

test('flow should throw an error if any element in the array is not a function', (t) => {
  const fn1 = () => { }
  const fn2 = 123
  const fn3 = () => { }

  t.exception(() => flow([fn1, fn2, fn3]), Error)
})

test('flow should work with functions that take multiple arguments', (t) => {
  const add = (a, b, c) => a + b + c
  const square = (a) => a * a

  const result = flow([add, square])(2, 3, 4)
  t.is(result, 81)
})

test('flow should work with complex arguments', (t) => {
  const add = (a, b) => [{ a, b }, a + b]
  const multiply = ([args, res]) => [args, args.a * args.b * res]
  const subtract = ([args, res]) => res - args.a

  t.is(flow([add, multiply, subtract])(2, 3), 28)
})
