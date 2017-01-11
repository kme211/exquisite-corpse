const expect = require('expect')
const utils = require('./index')

describe('utils', () => {

  describe('getPropertyErrors', () => {

    it('should return an array of errors if passed object is missing properties or if types are wrong', () => {
      const obj = { id: '112312', part: 1 }
      const requiredProps = { id: 'string', part: 'number', canvasData: 'array' }
      const actual = utils.getPropertyErrors(obj, requiredProps)
      const expected = ['canvasData is a required property and should be type: array']

      expect(actual).toEqual(expected)
    })

    it('should return null if no errors are found', () => {
      const obj = { id: '112312', part: 1, canvasData: [] }
      const requiredProps = { id: 'string', part: 'number', canvasData: 'array' }
      const actual = utils.getPropertyErrors(obj, requiredProps)

      expect(actual).toEqual(null)
    })

  })

})
