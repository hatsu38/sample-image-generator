import React, { Component, PropTypes } from 'react';

export default class CanvasImage extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const { canvas } = this;
    const context = canvas.getContext('2d');
    this.props.updateCanvas(context);
  }

  render() {
    return (
      <canvas
        id="canvas"
        ref={(e) => { this.canvas = e; }}
        width={this.props.width}
        height={this.props.height}
        style={{
          maxWidth: '100%',
          border: '1px solid #ccc'
        }}
      />
    )
  }
}

// CanvasImage.propTypes = {
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   backGroundColor: PropTypes.string.isRequired,
//   updateCanvas: PropTypes.func.isRequired,
// };