import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Logo = props => {
  return (

      <Link to="/" className="navbar-item">
        <StaticImage
          src={"../../static/assets/sketch-studios-logo.png"}
          alt={props.title}
          layout="fixed"
          width={42}
          height={42}
        />
      </Link>

  )
}

export default Logo
