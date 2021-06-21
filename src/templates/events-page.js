import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query EventsQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        events {
          name
          date(formatString: "DD/MM/YYYY")
          description
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
const EventsPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const events = frontmatter.events

  return (
    <Layout className="page">
      <Seo title={frontmatter.title} description={excerpt} />
      <div className="container">
        <div className="section">
          <h1 className="title is-size-2">{frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        {events.map((evt, i) => (
          <div className="section" key={i}>
            <div className="columns is-vcentered">
              <div className="column">
                <div className="content">
                  <h3 className="title is-size-4">{evt.name}</h3>
                  <p className="subtitle is-size-5 is-italic">{evt.date}</p>
                  <p className="">{evt.description}</p>
                </div>
              </div>
              <div className="column">
                <GatsbyImage image={evt.image.childImageSharp.gatsbyImageData} alt={`event-${i}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default EventsPage
