import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Logo = props => {
  return (
    <div className="site-logo">
      <Link to="/">
        <StaticImage
          src={"../../static/assets/sketch-studios-logo.png"}
          alt={props.title}
          layout="fixed"
          width={42}
          height={42}
        />
      </Link>
    </div>
  )
}

export default Logo
