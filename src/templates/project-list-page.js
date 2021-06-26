import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Seo from "../components/seo"

export const pageQuery = graphql`
  query ProjectsQuery($skip: Int!, $limit: Int!) {
    markdownRemark(frontmatter: {template: {eq: "projects-page"}}) {
      id
      frontmatter {
        title
      }
      html
      excerpt(pruneLength: 150)
    }
    projects: allMarkdownRemark(filter: { frontmatter: { template: { eq: "project" } } }, sort: { fields: frontmatter___date, order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          frontmatter {
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
            title
            date(formatString: "MM/YYYY")
          }
          html
        }
      }
    }
  }
`
const ProjectsPage = ({ data }) => {
  const { frontmatter, html, excerpt } = data.markdownRemark
  const projects = data.projects.edges

  return (
    <>
      <Seo title={frontmatter.title} description={excerpt} />

      <section className="section">
        <div className="container">
          <h1 className="title is-size-2">{frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
      {projects.map((prj, i) => (
        <section className="section" key={i}>
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column">
                <div className="content">
                  <h3 className="title is-size-4">{prj.node.frontmatter.title}</h3>
                  <article dangerouslySetInnerHTML={{ __html: prj.node.html }} />
                </div>
              </div>
              <div className="column">
                <GatsbyImage image={prj.node.frontmatter.image.childImageSharp.gatsbyImageData} alt={`project-${i}`} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default ProjectsPage
