import React from "react"
import { graphql, Link } from "gatsby"

export const pageQuery = graphql`
  query PostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        it {
          title
          special_text
        }
        en {
          title
          special_text
        }
      }
    }
  }
`
const Post = ({ data }) => {
  const { frontmatter} = data.markdownRemark

  return (
    <>
      <h1>{frontmatter.it.title}</h1>
      <h3>{frontmatter.it.special_text}</h3>
      <article dangerouslySetInnerHTML={frontmatter.it.article} />
    </>
  )
}

export default Post
