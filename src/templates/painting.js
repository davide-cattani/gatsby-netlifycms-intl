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

const Artist = ({ data, pageContext }) => {
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

          {frontmatter.socialNetworks && <ArtistSocials socials={frontmatter.socialNetworks} mail={frontmatter.mail} />}
        </section>
        {frontmatter.latestWorks && (
          <section className="section">
            <h2 className="title is-size-3 has-text-centered">Ultimi lavori</h2>
            <ArtistWorks works={frontmatter.latestWorks} />
          </section>
        )}
      </div>
      {/* {(previous || next) && <Pagination {...props} />} */}
    </>
  )
}

const ArtistWorks = ({ works }) => {
  return works.map((work, i) => (
    <section className="section" key={i}>
      <div className="container is-max-desktop px-6">
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

const ArtistSocials = ({ socials, mail }) => {
  return (
    <nav className="is-flex is-flex-direction-row is-justify-content-center is-align-items-center mt-6">

      <div className="social-icon">
        <a href={"mailto:" + mail}>
          <GoMail />
        </a>
      </div>

      {socials.map((social, i) => (
        <div className="social-icon" key={i}>
          <a href={"https://" + social.url}>
            {social.social == "facebook" && <FaFacebook />}
            {social.social == "twitter" && <FaTwitter />}
            {social.social == "instagram" && <FaInstagram />}
            {social.social == "linkedin" && <FaLinkedin />}
            {social.social == "sito web" && <CgWebsite />}
            {social.social == "twitch" && <FaTwitch />}
            {social.social == "skype" && <FaSkype />}
          </a>
        </div>
      ))}
    </nav>
  )
}

export default Artist

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
