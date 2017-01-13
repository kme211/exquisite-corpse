import React, { PropTypes } from 'react'
import NextLink from './NextLink'
import { getAdjacentPositions } from 'utils'
import Button from 'components/common/Button'
import Grid from 'components/common/Grid'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'
import { colors } from 'components/globals'

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const InnerWraper = styled.div`
  padding: 2rem;
  color: white;
  background: ${colors.primary[0]};
  max-width: 90%;
  border: 6px solid ${colors.success[1]};
  box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.5);
`


const Saved = ({ width, height, pos, nextPos, handleCellClick, canvasData }) => {
  console.log('nextPos', nextPos)
  const enabledCells = getAdjacentPositions(pos).filter(pos => !canvasData.some(data => isEqual(pos, data.pos)))
  const completedCells = canvasData.map(data => data.pos).concat(pos)
  console.log('enabledCells', enabledCells)
  console.log('completedCells', completedCells)
  return (
    <Wrapper>
      <InnerWraper>
        <h1>Awesome!</h1>
        <h2>Now select the section you want to pass to the next person.</h2>
        <Grid
          width={width}
          height={height}
          enabledCells={enabledCells}
          handleCellClick={handleCellClick}
          selectedCellPos={nextPos}
          completedCells={completedCells}
        />
        <NextLink pos={nextPos}/>
      </InnerWraper>
    </Wrapper>
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