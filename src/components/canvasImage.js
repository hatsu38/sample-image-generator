import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from "react-device-detect";

import AutoImage from "../components/autoImage"

export default class CanvasImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFileName: null
    }
  }
  componentDidMount() {
    this.updateCanvasAndConvertToImage();
  }

  componentDidUpdate(prevProps) {
    this.updateCanvas();
    if (this.props !== prevProps) {
      this.convertFromCanvasToImage();
    }
  }

  updateCanvasAndConvertToImage() {
    this.updateCanvas();
    this.convertFromCanvasToImage();
  }

  updateCanvas() {
    const { canvas } = this;
    if(!canvas) { return null; }

    const context = canvas.getContext('2d');
    this.props.updateCanvas(context);
  }

  convertFromCanvasToImage() {
    const canvas = document.getElementById('canvas');
    const imageFileName = canvas ? canvas.toDataURL(`image/${this.props.fileType}`) : null

    this.setState({ imageFileName: imageFileName })
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
          border: '1px solid #ccc',
          display: 'none'
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
    const canvas = this.renderCanvas();
    return (
      <>
        {canvas}
        <img id="canvas-to-image" src={this.state.imageFileName} style={{maxHeight: '100%', maxWidth: '100%'}} />
      </>
    );
  }
}

CanvasImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  updateCanvas: PropTypes.func.isRequired,
};