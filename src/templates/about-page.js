import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        coworkingDescription
        cta {
          ctaLink
          ctaText
        }
      }
      html
      excerpt(pruneLength: 150)
    }
  }
`
const AboutPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <Layout className="page">
      <Seo title={frontmatter.title} description={excerpt} />
      <div className="container">
        <div className="section">
          <h1 className="title is-size-2">{frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
          <div className="buttons is-centered">
            <Link to={frontmatter.cta.ctaLink} className="button is-primary is-large my-6">
              {frontmatter.cta.ctaText}
            </Link>
          </div>
        </div>
        <div className="section">
          <h1 className="title is-size-2">Lo spazio di co-working</h1>
          <article dangerouslySetInnerHTML={{ __html: frontmatter.coworkingDescription }} />
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
