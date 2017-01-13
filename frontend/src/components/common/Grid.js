
import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import isEqual from 'lodash/isEqual'
import { colors } from 'components/globals'

const gray = colors.grayscale[2]
const red = colors.danger[0]

const Wrapper = styled.div`
  margin: 0.5rem 0 1rem 0;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const cellStyle = ({ enabled, selected, completed }) => css`
  background: ${enabled ? (selected ? '#418C9F' : '#58B3D3') : (completed ? red : gray)};
  height: 40px;
  width: 40px;
  margin: 2px;
  cursor: pointer;
  pointer-events: ${enabled ? 'auto' : 'none'}
`

const Cell = styled.div`${cellStyle}`

const Grid = ({ enabledCells, completedCells, height, width, handleCellClick, selectedCellPos }) => {
  const rows = []
  for(let i = 0; i < height; i++) {
    const cells = []
    for(let n = 0; n < width; n++) {
      const selected = selectedCellPos.length ? selectedCellPos[0] === n && selectedCellPos[1] === i : false
      const enabled = enabledCells.some(cell => isEqual(cell, [n, i]))
      const completed = completedCells ? completedCells.some(cell => isEqual(cell, [n, i])) : false
      console.log('selected', selected, 'enabled', enabled, 'completed', completed)
      const cell = (
        <Cell 
          selected={enabled ? selected : false}
          completed={completed}
          enabled={enabled} 
          key={`cell-${i}-${n}`} 
          data-x={n} 
          data-y={i} 
          onClick={handleCellClick}
        />
      )
      
      cells.push(cell)
    }
    rows.push(<Row key={`row-${i}`}>{cells}</Row>)
  }

  return (
    <Wrapper>{rows}</Wrapper>
  )
}

Grid.propTypes = {
  enabledCells: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  selectedCellPos: PropTypes.array.isRequired,
  completedCells: PropTypes.array
}

export default Grid