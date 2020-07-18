import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

import "./reset.css"
import "./layout.css"
import "./index.css"
import "./form.css"

import { Container } from 'semantic-ui-react'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
        <Container>
          <main>{children}</main>
        </Container>
        <Footer siteTitle={data.site.siteMetadata.title} />
        <footer
          className="textCenter"
          style={{
            margin: `1rem auto 0.5rem`,
          }}
        >
          © {new Date().getFullYear()},
          {` `}
          <span>さんぷる画像ジェネレーター</span>
        </footer>
      <script src="/__/firebase/7.16.0/firebase-app.js"></script>
      <script src="/__/firebase/7.16.0/firebase-analytics.js"></script>
      <script src="/__/firebase/init.js"></script>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
