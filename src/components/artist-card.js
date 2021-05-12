/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const ArtistCard = ({ data }) => (
  <article
    className="post-card"
    sx={{
      bg: "cardBg",
    }}
  >
    {data.frontmatter.portrait ? (
      <Link to={data.frontmatter.slug}>
        <GatsbyImage
          image={data.frontmatter.portrait.childImageSharp.gatsbyImageData}
          alt={data.frontmatter.fullname + " - Portrait"}
          className="featured-image"
        />
      </Link>
    ) : (
      ""
    )}
    <div className="post-content">
      <h2 className="title">
        <Link
          to={data.frontmatter.slug}
          sx={{
            variant: "links.postLink",
          }}
        >
          {data.frontmatter.fullname}
        </Link>
      </h2>
      <p
        className="meta"
        sx={{
          color: "muted",
        }}
      >
      </p>
    </div>
  </article>
)

export default ArtistCard
