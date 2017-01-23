import { getAdjacentPositions, getAllPositions, isPositionAdjacent, mapPosition } from './index'

describe('getAdjacentPositions', () => {
  test('returns an array of neighboring sections', () => {
    const actual = getAdjacentPositions([0, 0])
    const expected = [[1,0], [0,1]]
    expect(actual).toEqual(expected)
  })
})

describe('getAllPositions', () => {
  test('returns an array of all the positons of the sections in a 2x2 grid', () => {
    const height = 2
    const width = 2
    const actual = getAllPositions({ width, height })
    const expected = [[0, 0], [0, 1], [1, 0], [1, 1]]
    
    for(let i = 0; i < expected.length; i++) {
      expect(actual).toContainEqual(expected[i])
    }
    expect(actual.length).toBe(4)
  })
  
  test('returns an array of all the positons of the sections in a 1x2 grid', () => {
    const height = 2
    const width = 1
    const actual = getAllPositions({ width, height })
    const expected = [[0, 0], [0, 1]]
    expect(actual).toEqual(expected)
  })
  
  test('returns an array of all the positons of the sections in a 2x1 grid', () => {
    const height = 1
    const width = 2
    const actual = getAllPositions({ width, height })
    const expected = [[0, 0], [1, 0]]
    expect(actual).toEqual(expected)
  })
})

describe('positionIsAdjacent', () => {
  test('returns false when pos2 is not next to pos1', () => {
    const actual = isPositionAdjacent([0, 1], [1, 0])
    const expected = false
    expect(actual).toBe(expected)
  })
  
  test('returns true when pos2 is next to pos1', () => {
    const actual = isPositionAdjacent([1, 1], [1, 2])
    const expected = true
    expect(actual).toBe(expected)
  })
  
  describe('mapPosition', () => {
    test('returns "bottom" if the second arg position is below the first arg position', () => {
      const actual = mapPosition([0,0], [0,1])
      const expected = 'bottom'
      expect(actual).toBe(expected)
    })
    
    test('returns "left" if the second arg position is to the left the first arg position', () => {
      const actual = mapPosition([1,0], [0,0])
      const expected = 'left'
      expect(actual).toBe(expected)
    })
    
    test('returns "right" if the second arg position is to the right the first arg position', () => {
      const actual = mapPosition([1,0], [2,0])
      const expected = 'right'
      expect(actual).toBe(expected)
    })
    
    test('returns "top" if the second arg position is above the first arg position', () => {
      const actual = mapPosition([1,1], [1,0])
      const expected = 'top'
      expect(actual).toBe(expected)
    })
  })
})