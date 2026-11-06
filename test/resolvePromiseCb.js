'use strict'

const test = require('brittle')
const assert = require('assert')
const resolvePromiseCb = require('../src/resolvePromiseCb')

test('resolvePromiseCb should handle callback errors', () => {
  let called = false
  resolvePromiseCb(new Error('foo'), null, (err) => {
    called = true
    assert.strictEqual(err.message, 'foo')
  })
  assert.strictEqual(called, true)
})

test('resolvePromiseCb should handle promise rejections', async () => {
  await assert.rejects(resolvePromiseCb(new Error('foo')), { message: 'foo' })
})

test('resolvePromiseCb should handle callback results', () => {
  let called = false
  resolvePromiseCb(null, 'foo', (err, res) => {
    called = true
    assert.strictEqual(err, null)
    assert.strictEqual(res, 'foo')
  })
  assert.strictEqual(called, true)
})

test('resolvePromiseCb should handle promise resolves', async () => {
  const res = await resolvePromiseCb(null, 'foo')
  assert.strictEqual(res, 'foo')
})
