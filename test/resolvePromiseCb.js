'use strict'

const test = require('brittle')
const resolvePromiseCb = require('../src/resolvePromiseCb')

test('resolvePromiseCb should handle callback errors', (t) => {
  let called = false
  resolvePromiseCb(new Error('foo'), null, (err) => {
    called = true
    t.is(err.message, 'foo')
  })
  t.is(called, true)
})

test('resolvePromiseCb should handle promise rejections', async (t) => {
  await t.exception(resolvePromiseCb(new Error('foo')), { message: 'foo' })
})

test('resolvePromiseCb should handle callback results', (t) => {
  let called = false
  resolvePromiseCb(null, 'foo', (err, res) => {
    called = true
    t.is(err, null)
    t.is(res, 'foo')
  })
  t.is(called, true)
})

test('resolvePromiseCb should handle promise resolves', async (t) => {
  const res = await resolvePromiseCb(null, 'foo')
  t.is(res, 'foo')
})
