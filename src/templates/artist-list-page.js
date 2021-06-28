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

export const artistListQuery = graphql`
  query artistListQuery($skip: Int!, $limit: Int!) {
    artists: allMarkdownRemark(filter: { frontmatter: { template: { eq: "artist" } } }, sort: { fields: frontmatter___date, order: ASC }, limit: $limit, skip: $skip) {
      edges {
        node {
          id
          frontmatter {
            portrait {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 400, height: 400, placeholder: TRACED_SVG)
              }
            }
            fullname
            role
            description
            slug
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
class ArtistIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numPages } = this.props.pageContext
    const artistSlug = "/artists/"
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? artistSlug : artistSlug + (currentPage - 1).toString()
    const nextPage = artistSlug + (currentPage + 1).toString()

    const artists = data.artists

    let props = {
      isFirst,
      prevPage,
      numPages,
      artistSlug,
      currentPage,
      isLast,
      nextPage,
    }

    return (
      <>
        <Seo title={"Gli artisti dello Sketch Studio"} description={""} />
        <div className="container">
          <section className="section mb-6">
            <div className="content mb-6">
              <h1 className="title is-size-2 has-text-centered">Gli Artisti</h1>
            </div>
            <ArtistCardList data={artists} />
          </section>
        </div>
        <Pagination {...props} />
      </>
    )
  }
}

export default ArtistIndex
