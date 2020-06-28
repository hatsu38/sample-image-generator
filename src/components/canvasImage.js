import React, { Component, PropTypes } from 'react';

export default class CanvasImage extends Component {
  // constructor(props) {
  //   super(props);
  // }
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
    console.log('context', context);
    console.log('props', this.props);
    this.props.updateCanvas(context);
  }

  render() {
    return <canvas
      ref={(e) => { this.canvas = e; }}
      width={this.props.width}
      height={this.props.height}
      style={{
        backgroundColor: this.props.backgroundColor,
        borderRadius:　this.props.borderRadius,
        borderColor: this.props.borderColor,
        borderWidth: this.props.borderWidth,
        borderStyle: 'solid'
      }} />;
  }
}

// CanvasImage.propTypes = {
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   backGroundColor: PropTypes.string.isRequired,
//   updateCanvas: PropTypes.func.isRequired,
// };