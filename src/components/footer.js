/** @jsx jsx */
import {React} from "react"
import { jsx } from "theme-ui"
import { RiHeart2Line } from "react-icons/ri"

const Footer = () => {

  return (
    <footer
      className="footer"
      sx={{ bg: "primaryColor", }}
    >
      <div className="content has-text-centered">
        <p className="mb-6">
          Fatto con il{" "}
          <span style={{color: 'red'}}>
            <RiHeart2Line />
          </span>{" "}
          da <a href="https://www.davidecattani.dev">catta</a>
        </p>
        <button className="button is-small is-dark is-outlined" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Torna su
        </button>
      </div>
    </footer>
  )
} 

export default Footer
