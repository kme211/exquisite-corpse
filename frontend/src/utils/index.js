import isEqual from 'lodash/isEqual'
import curry from 'lodash/curry'

export const getAdjacentPositions = (pos, width = Infinity, height = Infinity) => {
  const [ x, y ] = pos
  let adjacentPositions = [
    [x - 1, y], 
    [x + 1, y], 
    [x, y - 1], 
    [x, y + 1]
  ]
  return adjacentPositions
    .filter(position => {
      const x = position[0]
      const y = position[1]
      return x >= 0 && x < width && y >= 0 && y < height
    })
}

export const getAllPositions = ({ height, width }) => {
  const positions = []
  for(let i = 0; i < height; i++) {
    for(let n = 0; n < width; n++) {
      positions.push([i, n])
    }
  }
  return positions
}

export const isPositionAdjacent = (pos1, pos2) => {
  const adjacentPositions = getAdjacentPositions(pos1)
  const isEqualToPos2 = curry(isEqual)(pos2)
  return adjacentPositions.some(isEqualToPos2)
}