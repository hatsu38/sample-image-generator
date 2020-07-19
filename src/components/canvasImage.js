import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./canvasimage.css"

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

  componentDidUpdate(nextProps) {
    if(this.props === nextProps) { return null; }

    this.updateCanvasAndConvertToImage()
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

  render() {
    return (
      <>
        <canvas
          id="canvas"
          ref={(e) => { this.canvas = e; }}
          width={this.props.width}
          height={this.props.height}
          style={{display: 'none'}}
        />
        <div className="maxWidthHightImage">
          <img id="canvas-to-image" className="imageFrame" src={this.state.imageFileName} alt="" />
        </div>
      </>
    );
  }
}

CanvasImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fileType: PropTypes.string.isRequired,
  updateCanvas: PropTypes.func.isRequired,
};