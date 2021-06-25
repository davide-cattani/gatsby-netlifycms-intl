import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query ProjectsQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        projects {
          title
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
const ProjectsPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const projects = frontmatter.projects

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
                  <h3 className="title is-size-4">{prj.title}</h3>
                  <p className="">{prj.description}</p>
                </div>
              </div>
              <div className="column">
                <GatsbyImage image={prj.image.childImageSharp.gatsbyImageData} alt={`project-${i}`} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default ProjectsPage
