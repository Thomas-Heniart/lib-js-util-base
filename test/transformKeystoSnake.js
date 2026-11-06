'use strict'

const test = require('brittle')
const alikePlain = require('./helpers/alikePlain')
const { transformKeysToSnake } = require('../index')

for (const [index, input] of [new Date(), null, false].entries()) {
  test(`transformKeysToSnake non recursive (default) should return input when it is not an object [${index + 1}]`, (t) => {
    t.is(transformKeysToSnake(input), input)
  })
}

test('transformKeysToSnake non recursive (default) should return input with snake case props recursively', (t) => {
  const input = {
    camelProp: 'true',
    nestedProp: {
      first_name: 'john',
      lastName: 'doe',
      tags: ['keepCamel']
    },
    someObjs: [
      { someProp: 'value' },
      { foo_bar: 'value', foo: 'value' }
    ]
  }
  const output = {
    camel_prop: 'true',
    nested_prop: {
      first_name: 'john',
      lastName: 'doe',
      tags: ['keepCamel']
    },
    some_objs: [
      { someProp: 'value' },
      { foo_bar: 'value', foo: 'value' }
    ]
  }
  alikePlain(t, transformKeysToSnake(input), output)
})

test('transformKeysToSnake non recursive (default) should work with array mix of object and nested arrays', (t) => {
  const input = {
    mixedArray: [123, { someKey: 'value' }, [{ nestedArrayItem: 'test' }]]
  }
  const output = {
    mixed_array: [123, { someKey: 'value' }, [{ nestedArrayItem: 'test' }]]
  }
  alikePlain(t, transformKeysToSnake(input), output)
})

for (const [index, input] of [new Date(), null, false].entries()) {
  test(`transformKeysToSnake recursive should return input when it is not an object [${index + 1}]`, (t) => {
    t.is(transformKeysToSnake(input, { recursive: true }), input)
  })
}

test('transformKeysToSnake recursive should return input with snake case props recursively', (t) => {
  const input = {
    camelProp: 'true',
    nestedProp: {
      first_name: 'john',
      lastName: 'doe',
      level2: {
        fooBar: 'x'
      },
      tags: ['keepCamel']
    },
    someObjs: [
      { someProp: 'value' },
      { foo_bar: 'value', foo: 'value' }
    ]
  }
  const output = {
    camel_prop: 'true',
    nested_prop: {
      first_name: 'john',
      last_name: 'doe',
      level2: {
        foo_bar: 'x'
      },
      tags: ['keepCamel']
    },
    some_objs: [
      { some_prop: 'value' },
      { foo_bar: 'value', foo: 'value' }
    ]
  }
  alikePlain(t, transformKeysToSnake(input, { recursive: true }), output)
})

test('transformKeysToSnake recursive should work with array mix of object and nested arrays', (t) => {
  const input = {
    mixedArray: [123, { someKey: 'value' }, [{ nestedArrayItem: 'test' }]]
  }
  const output = {
    mixed_array: [123, { some_key: 'value' }, [{ nested_array_item: 'test' }]]
  }
  alikePlain(t, transformKeysToSnake(input, { recursive: true }), output)
})
