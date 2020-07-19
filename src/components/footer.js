import { Link } from "gatsby"
import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Icon } from 'semantic-ui-react'

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  copyClick = () => {
    this.setState({copied: true})
    setTimeout(
      () => this.setState({copied: false}),
      3000
    );
  }

  render() {
    const shareURL = "https://sample-image-generator.hatsu38.com/"
    return (
      <>
        <div className='textCenter'>
          <Link
            to={`https://twitter.com/share?url=${shareURL}`}
            className='iconLinkSpace'
            rel="nofollow"
            target="_blank"
          >
            <Icon link name='twitter' size='big' />
          </Link>
          <Link
            to={`http://www.facebook.com/share.php?u=${shareURL}`}
            className='iconLinkSpace'
            rel="nofollow"
            target="_blank"
          >
            <Icon link name='facebook' size='big' />
          </Link>
          <Link to='/' className='iconLinkSpace'>
            <CopyToClipboard
              text={shareURL}
              onCopy={this.copyClick}
            >
              <Icon link name='copy' size='big' />
            </CopyToClipboard>
          </Link>
          {this.state.copied ? <span style={{color: 'red', fontWeight: 'bold'}}>URLをコピーしました</span> : null}
        </div>
      </>
    )
  }
}

