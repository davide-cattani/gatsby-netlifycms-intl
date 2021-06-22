/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiHeart2Line } from "react-icons/ri"

const Footer = () => (
  <footer
    className="footer"
    sx={{ bg: "primaryColor", }}
  >
    <div className="content has-text-centered">
      <p>
        Fatto con il{" "}
        <span style={{color: 'red'}}>
          <RiHeart2Line />
        </span>{" "}
        da <a href="https://www.davidecattani.dev">catta</a>
      </p>
    </div>
  </footer>
)

export default Footer
