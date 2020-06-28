import React, { Component, PropTypes } from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CanvasImage from "../components/canvasImage"


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Sample',
      color: '#18283e',
      backgroundColor: '#ff00ff',
      width: 800,
      height: 400,
      fontSize: 60,
      textAlign: 'center'
    };
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    console.log(value);
    this.setState({
      [name]: value,
    })
  }

  render() {
    const canvasProps = {
      width: this.state.width,
      height: this.state.height,
      backgroundColor: this.state.backGroundColor,
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
          <form>
            <label>
              Text：
              <input
                type="text"
                name="text"
                value={this.state.text}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              fontSize：
              <input
                type="number"
                name="fontSize"
                value={this.state.fontSize}
                onChange={this.handleInputChange}
              />
            </label>
          </form>
          <CanvasImage {...canvasProps} />
          <div>
            <Link to="/page-2/">Go to page 2</Link> <br />
            <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
          </div>
        </Layout>
      </>
    )
  }
}
