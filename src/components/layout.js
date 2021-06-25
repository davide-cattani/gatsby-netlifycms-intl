import React from "react"

import { useStaticQuery, graphql } from "gatsby"

import Navigation from "./navigation"

import "../assets/scss/style.scss"
import Footer from "./footer"

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
    # siteSearchIndex {
    #   index
    # }
  }
`

const Layout = ({ children, className, props }) => {
  const { site } = useStaticQuery(query)

  return (
    <>
      <Navigation site={site.siteMetadata} />
      <main className="mb-6">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
