/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function ArtistCardList({ data, isHome }) {
  return (
    <div className="my-4">
      {isHome && <h3 className="subtitle is-size-3 has-text-centered">Gli Artisti</h3>}

      <div className="columns is-multiline is-centered">
        {data.edges.map((edge, i) => (
          <div className="column is-4 p-4" key={i}>
            <ArtistInfo key={edge.node.id} data={edge.node.frontmatter} isHome={isHome} />
          </div>
        ))}
      </div>
    </div>
  )
}

const ArtistInfo = ({ data, isHome }) => (
  <div className="card">
    <Link to={`/artists/${data.slug}`}>
      <div className="card-image">
        <GatsbyImage image={data.portrait.childImageSharp.gatsbyImageData} alt={data.fullname} />
      </div>
      <div className="card-content">
        <h6 className="title is-size-5">{data.fullname}</h6>
        <p className="subtitle is-size-6 is-italic">{data.role}</p>
        {isHome && <p className="content">{data.description}</p>}
      </div>
    </Link>
  </div>
)
