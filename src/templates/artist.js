/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTwitch, FaBehance, FaSkype, FaLinkedin } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Pagination = props => (
  <div>
    <ul>
      {props.previous && props.previous.frontmatter.template === "artist" && (
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
      {props.next && props.next.frontmatter.template === "artist" && (
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

const Artist = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const Image = frontmatter.portrait ? frontmatter.portrait.childImageSharp.gatsbyImageData : ""
  const { previous, next } = pageContext

  let props = {
    previous,
    next,
  }

  return (
    <Layout className="page">
      <Seo title={frontmatter.fullname} description={frontmatter.description ? frontmatter.description : excerpt} article={true} />
      <div className="container">
        <section className="section">
          <div className="hero mb-5">
            <div className="hero-body">
              <h1 className="title is-size-2 has-text-centered">{frontmatter.fullname}</h1>
              <h4 className="subtitle is-size-4 has-text-centered">{frontmatter.role}</h4>
            </div>
          </div>
          <div className="columns is-vcentered">
            <div className="column">{Image ? <GatsbyImage image={Image} alt={frontmatter.fullname + " - Portrait"} /> : ""}</div>
            <div className="column">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>

          {/* {frontmatter.socialNetworks && <ArtistSocials socials={frontmatter.socialNetworks} />} */}
          
        </section>
        {frontmatter.latestWorks && (
          <section className="section">
            <h2 className="title is-size-3 has-text-centered">Ultimi lavori</h2>
            <ArtistWorks works={frontmatter.latestWorks} />
          </section>
        )}
      </div>
      {/* {(previous || next) && <Pagination {...props} />} */}
    </Layout>
  )
}

const ArtistWorks = ({ works }) => {
  return works.map((work, i) => (
    <section className="section" key={i}>
      <div className="container is-max-desktop">
        {work.workImage && <GatsbyImage image={work.workImage.childImageSharp.gatsbyImageData} alt={work.title} />}
        <div className="content has-text-centered p-4">
          <h6 className="subtitle is-size-4 has-text-weight-semibold">{work.title}</h6>
          <p className="is-italic has-text-grey">{work.date}</p>
          <p>{work.comment}</p>
        </div>
      </div>
    </section>
  ))
}

const ArtistSocials = ({ socials }) => {
  console.log(socials)
  return (
    <nav className="level">

          <div className="level-item has-text-centered">{socials.facebook}</div>
        
    </nav>
  )
}

export default Artist

export const pageQuery = graphql`
  query ArtistQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        slug
        fullname
        role
        description
        portrait {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        latestWorks {
          title
          date(formatString: "DD/MM/YYYY")
          comment
          workImage {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`
