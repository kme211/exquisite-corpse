const expect = require('expect')
const helper = require('../../test-helper')
const Drawing = require('./drawing')
const request = require('supertest-as-promised')(helper.app)
const URL = '/api/drawings'

describe('Drawings', () => {
  let drawing
  
  before(() => {
    return helper.dropCollection(Drawing)
  })
  
  it('should return an id for a new drawing', () => {
    return request
      .get(`${URL}/new`)
      .then((res) => {
        expect(() => res.body.drawingId).toNotThrow()
        expect(res.body.drawingId).toExist()
        expect(res.body.drawingId).toBeA('string')
      })
  })
  
})