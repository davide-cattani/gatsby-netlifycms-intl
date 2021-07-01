import { graphql } from "gatsby"

export const IndexPageFields = graphql`
  fragment IndexPageFields on Lang {
    title
    subtitle
    body {
      html
    }
  }
`

export const PostFields = graphql`
  fragment PostFields on Lang {
    title
    special_text
  }
`
