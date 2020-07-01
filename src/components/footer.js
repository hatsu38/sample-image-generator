import { Link } from "gatsby"
import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Icon } from 'semantic-ui-react'

export default class Footer extends Component {
  render() {
    const shareURL = 'https://sample-image-generator.web.app/'
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
            <CopyToClipboard text={shareURL}>
              <Icon link name='linkify' size='big' />
            </CopyToClipboard>
          </Link>
        </div>
      </>
    )
  }
}

