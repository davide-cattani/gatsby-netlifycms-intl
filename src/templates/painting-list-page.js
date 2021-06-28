/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"
import Seo from "../components/seo"
import ArtistCardList from "../components/artist-card-list"

const styles = {
  pagination: {
    a: {
      color: "muted",
      "&.is-active": {
        color: "text",
      },
      "&:hover": {
        color: "text",
      },
    },
  },
}

export const paintingListQuery = graphql`
  query paintingListQuery($skip: Int!, $limit: Int!) {
    paintings: allMarkdownRemark(filter: { frontmatter: { template: { eq: "painting" } } }, sort: { fields: frontmatter___date, order: ASC }, limit: $limit, skip: $skip) {
      edges {
        node {
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
    }
  }
`
const Pagination = props => (
  <div className="pagination mb-6" sx={styles.pagination}>
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
            <span className="icon -left">
              <RiArrowLeftLine />
            </span>{" "}
            Previous
          </Link>
        </li>
      )}
      {Array.from({ length: props.numPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`}>
          <Link to={`${props.artistSlug}${i === 0 ? "" : i + 1}`} className={props.currentPage === i + 1 ? "is-active num" : "num"}>
            {i + 1}
          </Link>
        </li>
      ))}
      {!props.isLast && (
        <li>
          <Link to={props.nextPage} rel="next">
            Next{" "}
            <span className="icon -right">
              <RiArrowRightLine />
            </span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)
class PaintingIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numPages } = this.props.pageContext
    const paintingSlug = "/paintings/"
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? paintingSlug : paintingSlug + (currentPage - 1).toString()
    const nextPage = paintingSlug + (currentPage + 1).toString()

    const paintings = data.paintings

    let props = {
      isFirst,
      prevPage,
      numPages,
      paintingSlug: paintingSlug,
      currentPage,
      isLast,
      nextPage,
    }

    return (
      <>
        <Seo title={"Galleria"} description={""} />
        <div className="container">
          <section className="section mb-6">
            <div className="content mb-6">
              <h1 className="title is-size-2 has-text-centered">Galleria</h1>
            </div>
            {/* <ArtistCardList data={paintings} /> */}
          </section>
        </div>
        <Pagination {...props} />
      </>
    )
  }
}

export default PaintingIndex