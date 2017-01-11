const expect = require('expect')
const helper = require('../test-helper')
const Drawing = require('../app/models/drawing')
const request = require('supertest-as-promised')(helper.app)
const URL = '/api/drawings'

describe('Drawings', () => {
  let drawing
  let id

  before(() => {
    return helper.dropCollection(Drawing)
  })

  it('should return an id for a new drawing', () => {
    return request
      .get(`${URL}`)
      .then((res) => {
        expect(() => id = res.body.drawingId).toNotThrow()
        expect(id).toExist()
        expect(id).toBeA('string')
      })
  })

  it('should return a drawing', () => {
    return request
      .get(`${URL}/${id}`)
      .then((res) => {
        drawing = res.body
        expect(drawing).toIncludeKeys(['canvasData', 'date', '_id'])
        expect(drawing.canvasData).toBeAn('array')
        expect(drawing.canvasData.length).toBe(0)
        expect(drawing.date).toBeA('string')
      })
  })

  it('should save canvasData to the drawing', () => {
    const data = {
      id: id,
      canvasData: {
        pos: [0, 0],
        imageData: 'some mocked data'
      }
    }

    return request
      .post(`${URL}`)
      .send(data)
      .then((res) => {
        expect(res.body.id).toBe(id)
      })
  })

})
