import { getAdjacentPositions, getAllPositions, isPositionAdjacent } from './index'

describe('getAdjacentPositions', () => {
  test('returns an array of neighboring sections', () => {
    const actual = getAdjacentPositions([0, 0])
    const expected = [[1,0], [0,1]]
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
})