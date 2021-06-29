import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Logo = props => {
  return (

      <Link to="/" className="navbar-item" onClick={props.onClick}>
        <StaticImage
          src={"../../static/assets/placeholder.png"}
          alt={props.title}
          placeholder="tracedSVG"
          width={42}
          height={42}
        />
      </Link>

  )
}

export default Logo
