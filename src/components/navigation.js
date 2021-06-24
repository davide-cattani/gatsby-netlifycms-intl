/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { useState } from "react"

import Logo from "./logo"

const MenuItems = [
  // {
  //   path: "/",
  //   title: "Home",
  // },
  {
    path: "/about/",
    title: "Lo Studio",
  },
  {
    path: "/events/",
    title: "Eventi",
  },
  {
    path: "/artists/",
    title: "Gli Artisti",
  },
  {
    path: "/projects/",
    title: "Progetti Realizzati",
  },
  {
    path: "/contact/",
    title: "Contatti",
  },
]

const ListLink = props => (
  <Link to={props.to} className="navbar-item" activeClassName="is-active" onClick={props.onClick}>
    {props.children}
  </Link>
)

const Navigation = ({ site }) => {
  const [isActive, setisActive] = useState(false)

  const listMenuItems = MenuItems.map((menuItem, index) => (
    <ListLink
      key={index}
      to={menuItem.path}
      onClick={() => {
        setisActive(!isActive)
      }}
    >
      {menuItem.title}
    </ListLink>
  ))

  return (
    <nav className="navbar is-spaced" role="navigation" aria-label="main navigation" sx={{ bg: "primaryColor" }}>
      <div className="navbar-brand">
        <Logo
          title={site.siteTitle}
          logo={"/static/assets/sketch-studios-logo.png"}
          onClick={() => {
            setisActive(false)
          }}
        />

        <a
          onClick={() => {
            setisActive(!isActive)
          }}
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="menu" className={`navbar-menu ${isActive ? "is-active" : ""}`} sx={{ bg: "primaryColor" }}>
        <div className="navbar-start">{listMenuItems}</div>
      </div>
    </nav>
  )
}

export default Navigation
