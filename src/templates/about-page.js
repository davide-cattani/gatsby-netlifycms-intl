import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        cta {
          ctaLink
          ctaText
        }
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 600, height: 600)
          }
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
    <>
      <Seo title={frontmatter.title} description={excerpt} />

      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="title is-size-2">{frontmatter.title}</h1>
            <div className="columns">
              <div className="column">
                <GatsbyImage image={frontmatter.featuredImage.childImageSharp.gatsbyImageData} alt={frontmatter.title} />
              </div>
              <div className="column">
                <article className="my-6" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>

            <div className="buttons is-centered">
              <Link to={frontmatter.cta.ctaLink} className="button is-primary is-large mt-6 py-3" style={{ whiteSpace: "normal", height: "unset" }}>
                {frontmatter.cta.ctaText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
