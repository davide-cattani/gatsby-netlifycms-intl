/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImage } from "gatsby-plugin-image"

import ArtistCardList from "../components/artist-card-list"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        mainSection {
          title
          tagline
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 475, height: 475)
            }
          }
          backgroundImage {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, transformOptions: { fit: COVER })
            }
          }
          cta {
            ctaText
            ctaLink
          }
        }
      }
    }
    artists: allMarkdownRemark(filter: { frontmatter: { template: { eq: "artist" } } }) {
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

const HomePage = ({ data }) => {
  const { markdownRemark, artists } = data
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.mainSection.featuredImage ? frontmatter.mainSection.featuredImage.childImageSharp.gatsbyImageData : ""
  const BackgroundImage = getImage(frontmatter.mainSection.backgroundImage.childImageSharp.gatsbyImageData)

  return (
    <>
      <Seo />

      <div className="hero is-medium">
        <GatsbyImage className="index-background-image" image={BackgroundImage} objectFit="cover"  alt="" />
        {/* <BgImage id="background-image" image={BackgroundImage}> */}
        <div className="hero-body">
          <div id="index-page-header-columns" className="columns is-vcentered">
            <div className="column">
              <h1 className="title is-size-1">{frontmatter.mainSection.title}</h1>
              <h2 className="subtitle is-size-4">{frontmatter.mainSection.tagline}</h2>
              <div className="mb-6" dangerouslySetInnerHTML={{ __html: html }} />
              <div className="buttons is-centered">
                <Link to={frontmatter.mainSection.cta.ctaLink} className="button is-primary is-large">
                  {frontmatter.mainSection.cta.ctaText}
                </Link>
              </div>
            </div>
            <div className="column has-text-centered">{Image ? <GatsbyImage id="header-logo" image={Image} alt={frontmatter.mainSection.title + " - Featured image"} className="featured-image" /> : ""}</div>
          </div>
        </div>
        {/* </BgImage> */}
      </div>

      <section className="section is-medium no-background">
        <div className="container">
          <ArtistCardList data={artists} isHome={true} />
        </div>
      </section>

      {/* <BlogListHome data={posts} /> */}
    </>
  )
}

export default HomePage
