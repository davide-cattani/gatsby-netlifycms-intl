import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Seo from "../components/seo"

export const eventListQuery = graphql`
  query EventsQuery($skip: Int!, $limit: Int!) {
    markdownRemark {
      id
      frontmatter {
        title
      }
      html
      excerpt(pruneLength: 150)
    }
    events: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "event" } } }
      sort: {fields: frontmatter___date, order: DESC}
      limit: $limit
      skip: $skip) {
      edges {
        node {
          frontmatter {
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
            title
            date_start(formatString: "DD/MM/YYYY")
            date_end(formatString: "DD/MM/YYYY")
          }
          html
        }
      }
    }
  }
`
const EventsPage = ({ data }) => {
  const { frontmatter, html, excerpt } = data.markdownRemark
  const events = data.events.edges

  return (
    <>
      <Seo title={frontmatter.title} description={excerpt} />

      <section className="section">
        <div className="container">
          <h1 className="title is-size-2">{frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
      {events.map((evt, i) => (
        <section className="section" key={i}>
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column">
                <div className="content">
                  <h3 className="title is-size-4">{evt.title}</h3>
                  <p className="subtitle is-size-5 is-italic">{evt.date_start} - {evt.date_end}</p>
                  <article dangerouslySetInnerHTML={{ __html: evt.html }} />
                </div>
              </div>
              <div className="column">
                <GatsbyImage image={evt.image.childImageSharp.gatsbyImageData} alt={`event-${i}`} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default EventsPage
