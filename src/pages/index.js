import React, { Component } from 'react';
import { isMobile } from "react-device-detect";

import 'semantic-ui-css/semantic.min.css'

import Layout from "../components/layout"
import About from "../components/about"
import SEO from "../components/seo"
import CanvasImage from "../components/canvasImage"

import { Button, Form, Message, Checkbox } from 'semantic-ui-react'
import { TwitterPicker } from 'react-color';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  };

  get initialState() {
    return {
      isSquare: false,
      text: '',
      color: '#FFFFFF',
      backgroundColor: '#8ED1FC',
      xPosition: 0,
      yPosition: 0,
      width: 1100,
      height: 400,
      fontSize: 60,
      textAlign: 'center',
      borderColor: '#000000',
      borderWidth: 0,
      fileType: 'png',
      hasDownloadError: false
    };
  }

  resetState = () => {
    this.setState(this.initialState);
  }

  fixSnSize = event => {
    this.setState({height: 630})
    this.setState({width: 1200})
  }

  handleChangeFacebook = event => {
    this.setState({height: 630})
    this.setState({width: 1200})
  }

  downloadImage = () => {
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
    const value = target.value;
    const name = target.name

    this.setState({ [name]: value })
    if(!this.state.isSquare) { return null; }

    if(name === 'width' || name === 'height') {
      this.widthAndHeightSameDo(name, value)
    }
  }

  handleSelectChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleChangeSquare = event => {
    this.setState((prevState) => ({ isSquare: !prevState.isSquare }))

    if(!this.state.isSquare){
      this.setState({height: this.state.width})
    }
  }

  widthAndHeightSameDo(name, value) {
    if(name === 'width'){
      this.setState({height: value})
    } else if( name === 'height'){
      this.setState({width: value})
    }
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

  handleColorChange = name => color => {
    this.setState({ [name]: color.hex });
  };

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
    const selectableFileType = [
      {key: 'png' ,value: 'png', text: '.png'},
      {key: 'jpeg', value: 'jpeg', text: 'jpeg'}
    ];
    const colors =['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#FFFFFF', '#000000']
    const imageWrap  = isMobile ? "mobileImageWrap" : "imageWrap"
    return (
      <>
        <Layout>
          <SEO
            title="サンプル画像を簡単に作れる"
          />
          <About />
          <div className={imageWrap}>
            <CanvasImage {...canvasProps} ref={this.canvas} />
          </div>
          <div className="textCenter margin-bottom-sm">
            <Button onClick={this.resetState} basic className={ isMobile ? "fixSnsButton margin-bottom-xs" : null}>初期化</Button>
            <Button onClick={this.fixSnSize} basic color='blue' className={ isMobile ? "fixSnsButton margin-bottom-xs" : null}>SNS(Twitter・Facebook)の画像サイズにする</Button>
            {isMobile ?
              <Message info>
                <p>画像を長押しすると<br />画像の保存ができます。</p>
              </Message> :
              <Button color='blue' onClick={this.downloadImage}>保存</Button>
            }
          </div>
          {this.state.hasDownloadError &&
            <Message negative>
              <Message.Header>ダウンロードに失敗しました<span>🙇🏻‍♂️</span></Message.Header>
            </Message>
          }
          <Form>
            <Form.Field className="textCenter">
              <label>正方形にする</label>
              <Checkbox
                toggle
                name="isSquare"
                checked={this.state.isSquare}
                onChange={this.handleChangeSquare}
              />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  label='テキスト'
                  type="text"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='文字の大きさ'
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
                <TwitterPicker
                  colors={colors}
                  color={this.state.color}
                  onChange={this.handleColorChange('color')}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label={`幅: ${this.state.width}px `}
                min={0}
                max={5000}
                step={5}
                name='width'
                onChange={this.handleInputChange}
                type='range'
                value={this.state.width}
              />
              <Form.Input
                label={`高さ: ${this.state.height}px `}
                min={0}
                max={5000}
                step={5}
                name='height'
                onChange={this.handleInputChange}
                type='range'
                value={this.state.height}
              />
              <Form.Field>
                <label>背景色</label>
                <TwitterPicker
                  colors={colors}
                  color={this.state.backgroundColor}
                  onChange={this.handleColorChange('backgroundColor')}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label={`枠線の幅: ${this.state.borderWidth}px `}
                min={0}
                max={299}
                name='borderWidth'
                onChange={this.handleInputChange}
                type='range'
                value={this.state.borderWidth}
              />
              <Form.Field>
                <Form.Select
                  name="fileType"
                  label='拡張子'
                  selection
                  defaultValue={this.state.fileType}
                  onChange={this.handleSelectChange}
                  options={selectableFileType}
                />
              </Form.Field>
              <Form.Field>
                <label>枠線の色</label>
                <TwitterPicker
                  colors={colors}
                  color={this.state.borderColor}
                  onChange={this.handleColorChange('borderColor')}
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
