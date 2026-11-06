'use strict'

const test = require('brittle')
const { orderBy } = require('../index')

test('orderBy should order array of objects by name prop in desc', (t) => {
  const mockedArr = [
    { name: 'aaa' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'yyy' }
  ]

  const orderedArr = orderBy(mockedArr, ['name'], ['desc'])

  t.alike(orderedArr, [
    { name: 'yyy' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'aaa' }
  ])
})

test('orderBy should order array of objects by name prop in asc', (t) => {
  const mockedArr = [
    { name: 'aaa' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'yyy' }
  ]

  const orderedArr = orderBy(mockedArr, ['name'], ['asc'])

  t.alike(orderedArr, [
    { name: 'aaa' },
    { name: 'bbb' },
    { name: 'www' },
    { name: 'yyy' }
  ])
})

test('orderBy should order array of objects by name and value props in desc and asc', (t) => {
  const mockedArr = [
    { name: 'aaa', value: 't' },
    { name: 'www', value: 'b' },
    { name: 'bbb', value: 'f' },
    { name: 'www', value: 'a' },
    { name: 'yyy' }
  ]

  const orderedArr = orderBy(
    mockedArr,
    ['name', 'value'],
    ['desc', 'asc']
  )

  t.alike(orderedArr, [
    { name: 'yyy' },
    { name: 'www', value: 'a' },
    { name: 'www', value: 'b' },
    { name: 'bbb', value: 'f' },
    { name: 'aaa', value: 't' }
  ])
})

test('orderBy should order array of objects by name and value props in asc by default', (t) => {
  const mockedArr = [
    { name: 'aaa', value: 't' },
    { name: 'www', value: 'b' },
    { name: 'bbb', value: 'f' },
    { name: 'www', value: 'a' },
    { name: 'yyy' }
  ]

  const orderedArr = orderBy(
    mockedArr,
    ['name', 'value']
  )

  t.alike(orderedArr, [
    { name: 'aaa', value: 't' },
    { name: 'bbb', value: 'f' },
    { name: 'www', value: 'a' },
    { name: 'www', value: 'b' },
    { name: 'yyy' }
  ])
})

test('orderBy should order array of objects by name prop in desc using dot syntax', (t) => {
  const mockedArr = [
    { nestedObj: { name: 'aaa' } },
    { nestedObj: { name: 'www' } },
    { nestedObj: { name: 'bbb' } },
    { nestedObj: { name: 'yyy' } }
  ]

  const orderedArr = orderBy(
    mockedArr,
    ['nestedObj.name'],
    ['desc']
  )

  t.alike(orderedArr, [
    { nestedObj: { name: 'yyy' } },
    { nestedObj: { name: 'www' } },
    { nestedObj: { name: 'bbb' } },
    { nestedObj: { name: 'aaa' } }
  ])
})

test('orderBy should order array of objects by second item of array in desc using fn', (t) => {
  const mockedArr = [
    { nestedObj: { arr: [0, 'aaa'] } },
    { nestedObj: { arr: [0, 'www'] } },
    { nestedObj: { arr: [0, 'bbb'] } },
    { nestedObj: { arr: [0, 'yyy'] } }
  ]

  const orderedArr = orderBy(
    mockedArr,
    [(item) => item?.nestedObj?.arr?.[1]],
    ['desc']
  )

  t.alike(orderedArr, [
    { nestedObj: { arr: [0, 'yyy'] } },
    { nestedObj: { arr: [0, 'www'] } },
    { nestedObj: { arr: [0, 'bbb'] } },
    { nestedObj: { arr: [0, 'aaa'] } }
  ])
})

test('orderBy should order array of array by index in desc', (t) => {
  const mockedArr = [
    ['name', 'aaa'],
    ['name', 'www'],
    ['name', 'bbb'],
    ['name', 'yyy']
  ]

  const orderedArr = orderBy(mockedArr, [1], ['desc'])

  t.alike(orderedArr, [
    ['name', 'yyy'],
    ['name', 'www'],
    ['name', 'bbb'],
    ['name', 'aaa']
  ])
})

test('orderBy should order array by index in desc', (t) => {
  const mockedArr = ['aaa', 'www', 'bbb', 'yyy']

  const orderedArr = orderBy(mockedArr, [(item) => item], ['desc'])

  t.alike(orderedArr, ['yyy', 'www', 'bbb', 'aaa'])
})

test('orderBy should order iterable object (Set) of objects by name prop in desc', (t) => {
  const mockedSet = new Set([
    { name: 'aaa' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'yyy' }
  ])

  const orderedArr = orderBy(mockedSet, ['name'], ['desc'])

  // If iterable object is required, just create it after ordering
  t.alike(orderedArr, [
    { name: 'yyy' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'aaa' }
  ])
})

test('orderBy should order iterable object (Map) of objects by name prop and key in desc', (t) => {
  const mockedMap = new Map([
    ['key1', { name: 'aaa' }],
    ['key2', { name: 'www' }],
    ['key3', { name: 'bbb' }],
    ['key4', { name: 'yyy' }]
  ])

  const orderedArrByVal = orderBy(
    mockedMap,
    [([key, val]) => val?.name],
    ['desc']
  )
  const orderedArrByKey = orderBy(
    mockedMap,
    [([key, val]) => key],
    ['desc']
  )

  // If iterable object is required, just create it after ordering
  t.alike(orderedArrByVal, [
    ['key4', { name: 'yyy' }],
    ['key2', { name: 'www' }],
    ['key3', { name: 'bbb' }],
    ['key1', { name: 'aaa' }]
  ])
  t.alike(orderedArrByKey, [
    ['key4', { name: 'yyy' }],
    ['key3', { name: 'bbb' }],
    ['key2', { name: 'www' }],
    ['key1', { name: 'aaa' }]
  ])
})

test('orderBy should order array of objects by name prop in desc with equal values', (t) => {
  const mockedArr = [
    { name: 'aaa' },
    { name: 'www' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'yyy' },
    { name: 'aaa' }
  ]

  const orderedArr = orderBy(mockedArr, ['name'], ['desc'])

  t.alike(orderedArr, [
    { name: 'yyy' },
    { name: 'www' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'aaa' },
    { name: 'aaa' }
  ])
})

test('orderBy should order array of objects by name prop in desc with null and undefined', (t) => {
  const mockedArr = [
    { name: undefined },
    { name: 'aaa' },
    { name: null },
    { name: 'www' },
    { name: null },
    { name: undefined },
    { name: null },
    { name: 'bbb' },
    { name: 'yyy' }
  ]

  const orderedArr = orderBy(mockedArr, ['name'], ['desc'])

  t.alike(orderedArr, [
    { name: 'yyy' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'aaa' },
    { name: undefined },
    { name: null },
    { name: null },
    { name: undefined },
    { name: null }
  ])
})

test('orderBy should order array of objects by name prop in asc with null and undefined', (t) => {
  const mockedArr = [
    { name: undefined },
    { name: 'aaa' },
    { name: null },
    { name: 'www' },
    { name: null },
    { name: undefined },
    { name: null },
    { name: 'bbb' },
    { name: 'yyy' }
  ]

  const orderedArr = orderBy(mockedArr, ['name'], ['asc'])

  t.alike(orderedArr, [
    { name: 'aaa' },
    { name: 'bbb' },
    { name: 'www' },
    { name: 'yyy' },
    { name: undefined },
    { name: null },
    { name: null },
    { name: undefined },
    { name: null }
  ])
})

test('orderBy should order array of objects by name prop in desc with null and undefined items', (t) => {
  const mockedArr = [
    { name: undefined },
    { name: 'aaa' },
    { name: null },
    { name: 'www' },
    null,
    undefined,
    { name: null },
    { name: undefined },
    { name: null },
    { name: 'bbb' },
    null,
    { name: 'yyy' }
  ]

  const orderedArr = orderBy(mockedArr, ['name'], ['desc'])

  t.alike(orderedArr, [
    { name: 'yyy' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'aaa' },
    { name: undefined },
    { name: null },
    null,
    undefined,
    { name: null },
    { name: undefined },
    { name: null },
    null
  ])
})

test('orderBy should throw TypeError if non-iterable object is ordered', (t) => {
  t.exception.all(
    () => orderBy(null, ['name'], ['desc']),
    TypeError
  )
})

test('orderBy should throw TypeError if non-iterable object is prop name list', (t) => {
  const mockedArr = [
    { name: 'aaa' },
    { name: 'www' },
    { name: 'bbb' },
    { name: 'yyy' }
  ]

  t.exception.all(
    () => orderBy(mockedArr, null, ['desc']),
    TypeError
  )
})
