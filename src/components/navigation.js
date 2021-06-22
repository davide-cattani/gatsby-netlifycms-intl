/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import Logo from "./logo"

const MenuItems = [
  // {
  //   path: "/",
  //   title: "Home",
  // },
  {
    path: "/about",
    title: "Lo Studio",
  },
  {
    path: "/events",
    title: "Eventi",
  },
  {
    path: "/artists",
    title: "Gli Artisti",
  },
  {
    path: "/projects",
    title: "Progetti Realizzati",
  },
  {
    path: "/contact",
    title: "Contatti",
  },
]

const ListLink = props => (
  <Link to={props.to} className="navbar-item" activeClassName="is-active">
    {props.children}
  </Link>
)

const Navigation = ({ site }) => {
  const listMenuItems = MenuItems.map((menuItem, index) => (
    <ListLink key={index} to={menuItem.path}>
      {menuItem.title}
    </ListLink>
  ))

  return (
    <nav className="navbar is-spaced has-shadow" role="navigation" aria-label="main navigation" sx={{ bg: "primaryColor" }}>
      <div className="navbar-brand">
        <Logo title={site.siteTitle} logo={"/static/assets/sketch-studios-logo.png"} />

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="menu" className="navbar-menu">
        <div className="navbar-start">{listMenuItems}</div>
      </div>
    </nav>
  )
}

export default Navigation
