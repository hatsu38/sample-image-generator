import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from "react-device-detect";

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

  renderCanvas = () => {
    return (
      <canvas
        id="canvas"
        ref={(e) => { this.canvas = e; }}
        width={this.props.width}
        height={this.props.height}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          border: '1px solid #ccc'
        }}
      />
    )
  }

  renderCanvasByDevise = () => {
    if(!isMobile) { return this.renderCanvas() }

    return (
      <div style={{width: '289px', height: '149.5px', margin: '0 auto'}}>
        { this.renderCanvas() }
      </div>
    )
  };

  render() {
    return this.renderCanvasByDevise();
  }
}

CanvasImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  updateCanvas: PropTypes.func.isRequired,
};