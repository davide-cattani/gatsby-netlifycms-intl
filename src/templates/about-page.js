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
    <Layout className="page">
      <Seo title={frontmatter.title} description={excerpt} />
      <div className="container">
        <section className="section">
          <h1 className="title is-size-2">{frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
          <div className="buttons is-centered">
            <Link to={frontmatter.cta.ctaLink} className="button is-primary is-large mt-6">
              {frontmatter.cta.ctaText}
            </Link>
          </div>
        </section>
        <section className="section">
          <h2 className="title is-size-2">Lo spazio di co-working</h2>
          <article dangerouslySetInnerHTML={{ __html: frontmatter.coworkingDescription.html }} />
        </section>
        <section className="section">
          <div className="columns is-multiline is-centered">
            {images.map((img, i) => (
              <div className="column is-4 p-4" key={i}>
                <GatsbyImage image={img.image.childImageSharp.gatsbyImageData} alt={`img-${i}`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage
