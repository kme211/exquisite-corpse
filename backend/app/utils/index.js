const _ = require('lodash')

function isType(value, type) {
  if(type === 'array') {
    return Array.isArray(value)
  }
  return typeof value
}

function getDataWithPosition(canvasData, positionString) {
  return canvasData.find((data) => {
    return data.pos.join(',') === positionString
  })
}

exports.canvasDataIsAllThere = function(height, width, canvasData) {
  if(canvasData.length < (height * width)) return false
  for(let i = 0; i < height; i++) {
    for(let n = 0; n < width; n++) {
      let found = getDataWithPosition(canvasData, `${i},${n}`)
      if(!found) return false
    }
  }
  return true
}

/**
 * Check to make sure object has all required properties and property types
 * @param {object} obj - The object to check
 * @param {object} requiredProps - They required properties (key) and property types (value)
 * @example
 * getPropertyErrors({id: '112312', part: 1}, {id: 'string', part: 'number', canvasData: 'array'})
 * //returns ['canvasData is a required property and should be type: array']
 * @return {array|null} An array of the errors or `null`
 */
exports.getPropertyErrors = function has(obj, requiredProps) {
  const errors = []
  for(let prop in requiredProps) {
    if(!_.has(obj, prop)) {
      errors.push(`${prop} is a required property and should be type: ${requiredProps[prop]}`)
    } else if(!isType(obj[prop], requiredProps[prop])) {
      errors.push(`${prop} property should be type: ${requiredProps[prop]}`)
    }
  }
  return errors.length ? errors : null
}
