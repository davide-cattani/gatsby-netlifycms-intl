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
        coworkingDescription {
          html
        }
        cta {
          ctaLink
          ctaText
        }
        images {
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 600, height: 600)
            }
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
  const images = frontmatter.images

  return (
    <>
      <Seo title={frontmatter.title} description={excerpt} />

      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="title is-size-2">{frontmatter.title}</h1>
            <article className="my-6" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="buttons is-centered">
              <Link to={frontmatter.cta.ctaLink} className="button is-primary is-large mt-6 py-3" style={{ whiteSpace: "normal", height: "unset" }}>
                {frontmatter.cta.ctaText}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="content">
            <h2 className="title is-size-2">Lo spazio di co-working</h2>
            <article dangerouslySetInnerHTML={{ __html: frontmatter.coworkingDescription.html }} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline is-centered">
            {images.map((img, i) => (
              <div className="column is-4 p-4" key={i}>
                <GatsbyImage image={img.image.childImageSharp.gatsbyImageData} alt={`img-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
