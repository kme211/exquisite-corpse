import { getAdjacentPositions, getAllPositions, isPositionAdjacent, mapPosition } from './index'

describe('getAdjacentPositions', () => {
  test('returns an array of neighboring sections', () => {
    const actual = getAdjacentPositions([0, 0])
    const expected = [[1,0], [0,1]]
    expect(actual).toEqual(expected)
  })

  test('does not return positions out of the bounds of the grid when you pass a height and width', () => {
    const actual = getAdjacentPositions([0,1], 2, 2)
    const expected = [[1,1], [0,0]]
    expect(actual).toEqual(expected)
  })
})

describe('getAllPositions', () => {
  test('returns an array of all the positons of the sections in a grid', () => {
    const height = 2
    const width = 2
    const actual = getAllPositions({ width, height })
    const expected = [[0, 0], [0, 1], [1, 0], [1, 1]]
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