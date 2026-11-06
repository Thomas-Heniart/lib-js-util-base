'use strict'

/**
 * Inverts the key-value pairs of an object.
 *
 * @param {object} object - The object to invert.
 * @returns {object} - The new object with inverted key-value pairs.
 */
const invert = (object) => {
  const newObject = Object.create(null)
  for (const key in object) {
    newObject[object[key]] = key
  }
  return newObject
}

module.exports = invert
