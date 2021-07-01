import React from "react"
import { graphql, Link } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import {IndexPageFields} from "../fragments"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        it {
          ...IndexPageFields
        }
        en {
          ...IndexPageFields
        }
      }
    }
    posts: allMarkdownRemark(filter: { frontmatter: { it: { type: { eq: "post" } } } }) {
      edges {
        node {
          id
          frontmatter {
            it {
              ...PostFields
            }
            en {
              ...PostFields
            }
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts } = data
  const { frontmatter, html } = markdownRemark

  const intl = useIntl()

  return (
    <>
      <h1 className="title">{frontmatter.it.title}</h1>
      <h2 className="subtitle">{frontmatter.it.subtitle}</h2>
      <article dangerouslySetInnerHTML={{ __html: frontmatter.it.body.html}} className="content mb-6"/>

      {posts.edges.map((post) => {
        return (
          <article key={post.node.id}>
            <h1>{post.node.frontmatter.it.title}</h1>
          </article>
        )
      })}

      <p className="mt-6">
        <Link to="/">Back to language selection</Link>
      </p>
    </>
  )
}

export default HomePage
