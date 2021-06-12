/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function ArtistListHome({ data }) {
  return (
    <div className="my-4">
      <h3 className="subtitle is-size-3 has-text-centered">Gli Artisti</h3>

      <div className="columns is-multiline is-centered">
        {data.edges.map(edge => (
          <div className="column is-4 p-4">

              <ArtistInfo key={edge.node.id} data={edge.node.frontmatter} />

          </div>
        ))}
      </div>
    </div>
  )
}

const ArtistInfo = ({ data }) => (
  <div className="card">
    <div className="card-image">
      <GatsbyImage image={data.portrait.childImageSharp.gatsbyImageData} alt={data.fullname} />
    </div>
    <div className="card-content">
      <h6 className="title is-size-5">{data.fullname}</h6>
      <p className="subtitle is-size-6 is-italic">{data.role}</p>
      <p>{data.description}</p>
    </div>
  </div>
)
