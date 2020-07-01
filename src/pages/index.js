import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css'

import Layout from "../components/layout"
import SEO from "../components/seo"
import CanvasImage from "../components/canvasImage"

import { Button, Form } from 'semantic-ui-react'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.resetState = this.resetState.bind(this)
    this.downloadImage = this.downloadImage.bind(this)
  };

  get initialState() {
    return {
      text: '',
      color: '#ffffff',
      backgroundColor: '#cccccc',
      xPosition: 0,
      yPosition: 0,
      width: 800,
      height: 400,
      fontSize: 60,
      textAlign: 'center',
      borderColor: '#000000',
      borderWidth: 0,
      fileType: 'png',
      hasDownloadError: false
    };
  }

  resetState() {
    this.setState(this.initialState);
  }

  downloadImage() {
    const downloadLink = document.getElementById('downloadLink');
    const canvasToImage = document.getElementById('canvas-to-image');
    if(!downloadLink || !canvasToImage) { return this.setState({hasDownloadError: true }) };

    downloadLink.href = canvasToImage.src;
    downloadLink.download = `download.${this.state.fileType}`;
    downloadLink.click();
    this.setState({hasDownloadError: false })
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  createStroke(context) {
    context.strokeStyle = this.state.borderColor;
    context.lineWidth = this.state.borderWidth;
    context.strokeRect(this.state.xPosition, this.state.yPosition, this.state.width, this.state.height);
  }

  createRect(context) {
    // 背景を作る
    context.fillStyle = this.state.backgroundColor;
    context.fillRect(this.state.xPosition, this.state.yPosition, this.state.width, this.state.height);
  }

  createFillText(context, canvasText) {
    context.font = this.state.fontSize + "px 'ＭＳ ゴシック'";
    context.textAlign = "center";
    context.textBaseline = 'middle';
    context.fillStyle = this.state.color;
    context.fillText(canvasText, this.state.width/2, this.state.height/2);
  }

  render() {
    const canvasProps = {
      width: Number(this.state.width),
      height: Number(this.state.height),
      fileType: this.state.fileType,
      updateCanvas: (context) => {
        context.clearRect(this.state.xPosition, this.state.yPosition, this.state.width, this.state.height);
        this.createRect(context);

        // 枠線を作る
        if(this.state.borderWidth > 0){
          this.createStroke(context);
        }

        // 文字を作る
        const canvasText = this.state.text || `${this.state.width} × ${this.state.height}`
        if(canvasText) {
          this.createFillText(context, canvasText);
        }
      },
    };
    return (
      <>
        <Layout>
          <SEO title="Top" />
          <div className="textCenter">
            <CanvasImage {...canvasProps} ref={this.canvas} />
          </div>
          <div className="textCenter">
            <Button onClick={this.resetState}>初期化</Button>
            <Button color='blue' onClick={this.downloadImage}>保存</Button>
          </div>
          {this.state.hasDownloadError &&
            <p className="textCenter" style={{fontSize: '28px'}}>ダウンロードに失敗しました🙇🏻‍♂️</p>
          }
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>テキスト</label>
                <input
                  type="text"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>文字の大きさ</label>
                <input
                  type="number"
                  pattern="\d*"
                  name="fontSize"
                  min="0"
                  value={this.state.fontSize}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>文字の色</label>
                <input
                  type="color"
                  name="color"
                  value={this.state.color}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label={`幅: ${this.state.width}px `}
                min={1}
                max={4999}
                name='width'
                onChange={this.handleInputChange}
                type='range'
                value={this.state.width}
              />
              <Form.Input
                label={`高さ: ${this.state.height}px `}
                min={1}
                max={4999}
                name='height'
                onChange={this.handleInputChange}
                type='range'
                value={this.state.height}
              />
              <Form.Field>
                <label>背景色</label>
                <input
                  type="color"
                  name="backgroundColor"
                  value={this.state.backgroundColor}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label={`枠線の幅: ${this.state.borderWidth}px `}
                min={1}
                max={4999}
                name='borderWidth'
                onChange={this.handleInputChange}
                type='range'
                value={this.state.borderWidth}
              />
              <Form.Field>
                <label>枠線の色</label>
                <input
                  type="color"
                  name="borderColor"
                  value={this.state.borderColor}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
            </Form.Group>
          </Form>
          <a id="downloadLink" style={{display: 'none'}} />
        </Layout>
      </>
    )
  }
}
