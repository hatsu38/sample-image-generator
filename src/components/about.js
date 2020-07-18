import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import "./about.css"

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className="about--title">サンプル画像が簡単に作れる</h2>
        <p>
          色や大きさ、中の文字などを自由に編集することができます。
          {isMobile && <br />}
          簡易的なオリジナル画像を作る際にご利用ください！
        </p>
      </>
    )
  }
}