import React, { Component, PropTypes } from 'react';
import { Link } from "gatsby"

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
  };

  get initialState() {
    return {
      text: 'Sample',
      color: '#18283e',
      backgroundColor: '#ff00ff',
      width: 800,
      height: 400,
      fontSize: 60,
      textAlign: 'center',
      borderRadius: 18,
      borderColor: '#00ff00',
      borderWidth: 5
    };
  }

  resetState() {
    this.setState(this.initialState);
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    const canvasProps = {
      width: this.state.width,
      height: this.state.height,
      backgroundColor: this.state.backgroundColor,
      borderRadius: `${this.state.borderRadius}px`,
      borderColor: this.state.borderColor,
      borderWidth: `${this.state.borderWidth}px`,
      updateCanvas: (context) => {
        context.clearRect(0, 0, this.state.width, this.state.height);
        context.font = this.state.fontSize + "px 'ＭＳ ゴシック'";
        context.textAlign = "center";
        context.textBaseline = 'middle';
        context.fillStyle = this.state.color;
        context.fillText(this.state.text, this.state.width/2, this.state.height/2);
      },
    };
    return (
      <>
        <Layout>
          <SEO title="Home" />
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Text</label>
                <input
                  type="text"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>fontSize</label>
                <input
                  type="number"
                  name="fontSize"
                  min="0"
                  value={this.state.fontSize}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>fontColor</label>
                <input
                  type="color"
                  name="color"
                  value={this.state.color}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Width</label>
                <input
                  type="number"
                  name="width"
                  min="0"
                  value={this.state.width}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
              <label>Height</label>
                <input
                  type="number"
                  name="height"
                  min="0"
                  value={this.state.height}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>backgroundColor</label>
                <input
                  type="color"
                  name="backgroundColor"
                  value={this.state.backgroundColor}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>borderWidth</label>
                <input
                  type="number"
                  name="borderWidth"
                  min="0"
                  value={this.state.borderWidth}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
              <label>borderRadius</label>
                <input
                  type="number"
                  name="borderRadius"
                  min="0"
                  value={this.state.borderRadius}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>borderColor</label>
                <input
                  type="color"
                  name="borderColor"
                  value={this.state.borderColor}
                  onChange={this.handleInputChange}
                />
              </Form.Field>
            </Form.Group>
          </Form>
          <CanvasImage {...canvasProps} />
          <Button onClick={this.resetState}>初期化</Button>
          <div>
            <Link to="/page-2/">Go to page 2</Link> <br />
            <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
          </div>
        </Layout>
      </>
    )
  }
}
