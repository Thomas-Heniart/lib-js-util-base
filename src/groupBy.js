'use strict'

/**
 * Groups the elements of an array by a specified key.
 *
 * @param {Array} array - The array to group.
 * @param {Function|string} key - The key to group by, or a function to determine the group key.
 * @returns {Object} An object where keys are group names and values are arrays of grouped items.
 */
const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key]
    if (!Object.hasOwn(result, groupKey)) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, Object.create(null))
}

module.exports = groupBy
