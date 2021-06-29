/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function PaintingCardList({ data, isHome }) {
  return (
    <div className="my-4">
      {isHome && <h3 className="subtitle is-size-3 has-text-centered">Ultime opere</h3>}

      <div className="columns is-multiline is-centered">
        {data.edges.map((edge, i) => (
          <div className="column is-4 p-4 is-flex is-justify-content-center" key={i}>
            <PaintingInfo key={edge.node.id} data={edge.node.frontmatter} isHome={isHome} />
          </div>
        ))}
      </div>
    </div>
  )
}

const PaintingInfo = ({ data, isHome }) => (
  <section>
    <div className="card artist-card" style={{ maxWidth: "400px" }}>
      <Link to={`/paintings/${data.slug}`}>
        <div className="card-image">
          {data.featuredImage.childImageSharp && <GatsbyImage image={data.featuredImage.childImageSharp.gatsbyImageData} alt={data.fullname} />}
        </div>
        <div className="card-content has-text-centered">
          <h6 className="title is-size-5">{data.title}</h6>
          <p className="subtitle is-size-6 is-italic">{data.date}</p>
        </div>
      </Link>
    </div>
  </section>
)
