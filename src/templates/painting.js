/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Seo from "../components/seo"

const Pagination = props => (
  <div>
    <ul>
      {props.previous && props.previous.frontmatter.template === "painting" && (
        <li>
          <Link to={props.previous.frontmatter.slug} rel="prev">
            <p>
              <span className="icon -left">
                <RiArrowLeftLine />
              </span>{" "}
              Previous
            </p>
            <span>{props.previous.frontmatter.title}</span>
          </Link>
        </li>
      )}
      {props.next && props.next.frontmatter.template === "painting" && (
        <li>
          <Link to={props.next.frontmatter.slug} rel="next">
            <p>
              Next{" "}
              <span className="icon -right">
                <RiArrowRightLine />
              </span>
            </p>
            <span>{props.next.frontmatter.title}</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const Painting = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const Image = frontmatter.image ? frontmatter.image.childImageSharp.gatsbyImageData : ""
  const { previous, next } = pageContext

  let props = {
    previous,
    next,
  }

  return (
    <>
      <Seo title={frontmatter.title} description={excerpt} article={true} />
      <div className="container">
        <section className="section">
          <div className="hero mb-5">
            <div className="hero-body">
              <h1 className="title is-size-2 has-text-centered">{frontmatter.title}</h1>
            </div>
          </div>
          <div className="columns is-vcentered">
            <div className="column p-6">{Image ? <GatsbyImage image={Image} alt={frontmatter.title} /> : ""}</div>
            <div className="column">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </section>
      </div>
      {/* {(previous || next) && <Pagination {...props} />} */}
    </>
  )
}

export default Painting

export const pageQuery = graphql`
  query PaintingQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 150)
      frontmatter {
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        title
        date
        technique
        dimensions
      }
    }
  }
`
