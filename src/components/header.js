import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import AutoImage from "./autoImage"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
      marginBottom: `1rem`,
      textAlign: `center`,
      borderBottom: `1px solid #C7D3D9`,
    }}
  >
    <div
      style={{
        margin: `0 18px`,
        maxWidth: 960,
        height: `64px`,
        display: `flex`,
        alignItems: `center`,
        animation: `slideUpIn 1s ease-out`
      }}
    >
      <div style={{
        width: '30px'
      }}>
        <AutoImage filename={'no_image.png'} />
      </div>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#2185d0`,
            textDecoration: `none`,
            fontSize: `17.6px`,
            display: `flex`,
            marginLeft: `12px`,
            paddingLeft: `12px`,
            borderLeft: `1px solid #C7D3D9`
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
