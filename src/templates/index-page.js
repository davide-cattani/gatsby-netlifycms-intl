/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
  RiGithubFill,
  RiTelegramFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiSkypeFill,
  RiDribbbleFill,
  RiMediumFill,
  RiBehanceFill,
} from "react-icons/ri"
import { FaWordpress, FaVk } from "react-icons/fa"

import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import Seo from "../components/seo"
import Icons from "../util/socialmedia.json"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 585, height: 439)
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 345, height: 260)
              }
            }
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const social = Icons.socialLinks.map((social, index) => {
    return (
      <div key={"social icons" + index}>
        {social.social === "facebook" ? (
          <Link to={social.url} target="_blank">
            <RiFacebookBoxFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "twitter" ? (
          <Link to={social.url} target="_blank">
            <RiTwitterFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "linkedin" ? (
          <Link to={social.url} target="_blank">
            <RiLinkedinBoxFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "youtube" ? (
          <Link to={social.url} target="_blank">
            <RiYoutubeFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "instagram" ? (
          <Link to={social.url} target="_blank">
            <RiInstagramFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "rss" ? (
          <Link to={social.url} target="_blank">
            <RiRssFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "github" ? (
          <Link to={social.url} target="_blank">
            <RiGithubFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "telegram" ? (
          <Link to={social.url} target="_blank">
            <RiTelegramFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "pinterest" ? (
          <Link to={social.url} target="_blank">
            <RiPinterestFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "snapchat" ? (
          <Link to={social.url} target="_blank">
            <RiSnapchatFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "skype" ? (
          <Link to={social.url} target="_blank">
            <RiSkypeFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "wordpress" ? (
          <Link to={social.url} target="_blank">
            <FaWordpress />
          </Link>
        ) : (
          ""
        )}
        {social.social === "dribbble" ? (
          <Link to={social.url} target="_blank">
            <RiDribbbleFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "medium" ? (
          <Link to={social.url} target="_blank">
            <RiMediumFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "behance" ? (
          <Link to={social.url} target="_blank">
            <RiBehanceFill />
          </Link>
        ) : (
          ""
        )}
        {social.social === "vk" ? (
          <Link to={social.url} target="_blank">
            <FaVk />
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  })
  return (
    <Layout>
      <Seo />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1 className="title">{frontmatter.title}</h1>
          <p
            className="tagline"
            sx={{
              color: "muted",
            }}
          >
            {frontmatter.tagline}
          </p>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <Link
            to={frontmatter.cta.ctaLink}
            className="button"
            sx={{
              variant: "variants.button",
            }}
          >
            {frontmatter.cta.ctaText}
            <span className="icon -right">
              <RiArrowRightSLine />
            </span>
          </Link>
          {/* <div
            className="social-icons"
            sx={{
              variant: "variants.socialIcons",
            }}
          >
            {sIcons}
          </div> */}
        </div>
        <div>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <BlogListHome data={posts} /> */}
    </Layout>
  )
}

export default HomePage
