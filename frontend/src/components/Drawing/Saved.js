import React, { PropTypes } from 'react'
import NextLink from './NextLink'
import { getAdjacentPositions } from 'utils'
import Button from 'components/common/Button'
import Grid from 'components/common/Grid'
import isEqual from 'lodash/isEqual'

const Saved = ({ width, height, pos, nextPos, handleCellClick, canvasData }) => {
  console.log('canvasData', canvasData)
  const enabledCells = getAdjacentPositions(pos).filter(pos => canvasData.some(data => isEqual(pos, data.pos)))
  const completedCells = canvasData.map(data => data.pos)
  console.log('enabledCells', enabledCells)
  return (
    <div>
      <h2>Saved!</h2>
      <Grid
        width={width}
        height={height}
        enabledCells={enabledCells}
        handleCellClick={handleCellClick}
        selectedCellPos={nextPos}
        completedCells={completedCells}
      />
      <NextLink pos={nextPos}/>
    </div>
  )
}

Saved.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pos: PropTypes.array.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  canvasData: PropTypes.array.isRequired
}

export default Saved