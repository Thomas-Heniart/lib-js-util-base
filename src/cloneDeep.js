'use strict'

const isObject = require('./isObject')

const cloneDeep = (obj, clones = new WeakMap()) => {
  if (obj instanceof Function) return {}
  if (!isObject(obj)) return obj

  if (clones.has(obj)) return clones.get(obj)
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Map) {
    const newMap = new Map()
    clones.set(obj, newMap)
    obj.forEach((value, key) => {
      newMap.set(cloneDeep(key, clones), cloneDeep(value, clones))
    })
    return newMap
  }
  if (obj instanceof Set) {
    const newSet = new Set()
    clones.set(obj, newSet)
    obj.forEach(value => {
      newSet.add(cloneDeep(value, clones))
    })
    return newSet
  }
  if (typeof Buffer === 'function' && Buffer.isBuffer(obj)) {
    return Buffer.from(obj)
  }
  if (ArrayBuffer.isView(obj) && !(obj instanceof DataView)) {
    return new obj.constructor(obj)
  }

  const clonedObj = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))
  clones.set(obj, clonedObj)
  Object.defineProperties(clonedObj, Object.getOwnPropertyDescriptors(obj))

  for (const key of Object.keys(clonedObj)) {
    clonedObj[key] = cloneDeep(clonedObj[key], clones)
  }

  return clonedObj
}

module.exports = cloneDeep
