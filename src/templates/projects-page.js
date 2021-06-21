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
    <Layout className="page">
      <Seo title={frontmatter.title} description={excerpt} />
      <div className="container">
        <div className="section">
          <h1 className="title is-size-2">{frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        {projects.map((prj, i) => (
          <div className="section" key={i}>
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
        ))}
      </div>
    </Layout>
  )
}

export default ProjectsPage
