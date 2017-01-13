import React, { PropTypes, Component } from 'react'
import { newDrawing } from 'controllers/drawing'
import styled, { css } from 'styled-components'
import Grid from 'components/common/Grid'
import Button from 'components/common/Button'
import SizeForm from './SizeForm'
import { getAllPositions } from 'utils'

class NewDrawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      width: 2,
      height: 2,
      sizeConfirmed: false,
      selectedCellPos: [ 0, 0 ]
    }
    
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleConfirmSizeButtonClick = this.handleConfirmSizeButtonClick.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
    this.handleConfirmStartCell = this.handleConfirmStartCell.bind(this)
  }
  
  handleValueChange(e) {
    const change = {}
    change[e.target.name] = parseInt(e.target.value)
    this.setState(change)
  }
  
  handleConfirmSizeButtonClick(e) {
    this.setState({ sizeConfirmed: true })
  }
  
  handleConfirmStartCell(e) {
    const [ x, y ] = this.state.selectedCellPos
    const { width, height } = this.state
    newDrawing({ width, height }).then((res) => {
      let id = res.data.drawingId
      this.context.router.push(`/drawings/${id}/${x}/${y}`)
    })
  }
  
  handleCellClick(e) {
    const { x, y } = e.target.dataset
    const pos = [parseInt(x), parseInt(y)]
    this.setState({ selectedCellPos: pos })
  }

  render() {
    const { height, width, sizeConfirmed } = this.state
    return (
      <div>
        <h1>New drawing</h1>
          
        {!sizeConfirmed && <SizeForm handleValueChange={this.handleValueChange} width={width} height={height}/>}
        {sizeConfirmed && <p>Choose the section you want to start with.</p>}
        
        <Grid 
          width={width} 
          height={height}
          enabledCells={sizeConfirmed ? getAllPositions({ height, width }) : []}
          handleCellClick={this.handleCellClick}
          selectedCellPos={this.state.selectedCellPos}
        />
        
        {!this.state.sizeConfirmed && <Button width="100%" onClick={this.handleConfirmSizeButtonClick}>That's good</Button>}
        
        {this.state.sizeConfirmed && <Button width="100%" onClick={this.handleConfirmStartCell}>I'm ready to draw</Button>}
      </div>
    )
  }
}

NewDrawing.contextTypes = {
  router: PropTypes.object
}

export default NewDrawing
