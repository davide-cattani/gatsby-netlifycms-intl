/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

import Layout from "../components/layout"
import ArtistCardList from "../components/artist-card-list"
import Seo from "../components/seo"
import Icons from "../util/socialmedia.json"

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
              gatsbyImageData(layout: CONSTRAINED, width: 600, height: 600)
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
    <Layout>
      <Seo />

      <div className="hero is-medium">
        <BgImage id="background-image" image={BackgroundImage}>
          <div className="hero-body">
            <div className="columns">
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
              <div className="column has-text-centered">{Image ? <GatsbyImage image={Image} alt={frontmatter.mainSection.title + " - Featured image"} className="featured-image" /> : ""}</div>
            </div>
          </div>
        </BgImage>
      </div>
      <div className="container">
        <div className="section">
          <ArtistCardList data={artists} isHome={true} />
        </div>
      </div>
      {/* <BlogListHome data={posts} /> */}
    </Layout>
  )
}

export default HomePage
