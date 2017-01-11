import React, { PropTypes, Component } from 'react'
import { newDrawing } from 'controllers/drawing'

class NewDrawing extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      imageData: null
    }
  }

  componentDidMount() {
    newDrawing().then((res) => {
      let id = res.data.drawingId
      this.context.router.push(`/drawings/${id}`)
    })
  }

  render() {
    return (
      <div>
          <h1>New drawing</h1>
      </div>
    )
  }
}

NewDrawing.contextTypes = {
  router: PropTypes.object
}

export default NewDrawing
