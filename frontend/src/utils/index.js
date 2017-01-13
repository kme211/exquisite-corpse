export const getAdjacentPositions = (pos) => {
  const [ x, y ] = pos
  let adjacentPositions = [
    [x - 1, y], 
    [x + 1, y], 
    [x, y - 1], 
    [x, y + 1]
  ]
  return adjacentPositions
    .filter(position => position.every(num => num >= 0))
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