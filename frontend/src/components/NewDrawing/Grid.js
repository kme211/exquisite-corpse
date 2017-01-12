
import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  margin: 0.5rem 0 1rem 0;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const cellStyle = ({ enabled, selected }) => css`
  background: ${enabled ? (selected ? 'tomato' : 'gray') : 'gray'};
  height: 40px;
  width: 40px;
  margin: 2px;
  pointer-events: ${enabled ? 'auto' : 'none'}
`

const Cell = styled.div`${cellStyle}`

const Grid = ({ enabled, height, width, handleCellClick, selectedCellPos }) => {
  const rows = []
  for(let i = 0; i < height; i++) {
    const cells = []
    for(let n = 0; n < width; n++) {
      const selected = selectedCellPos[0] === n && selectedCellPos[1] === i
      const cell = (
        <Cell 
          selected={enabled ? selected : false}
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
  enabled: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  selectedCellPos: PropTypes.array.isRequired
}

export default Grid