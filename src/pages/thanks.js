import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiCheckboxCircleLine } from "react-icons/ri"

import Seo from "../components/seo"
import Layout from "../components/layout"

const Thanks = () => (
  <>
    <Seo title="Grazie!" />
    <div
      className="wrapper"
      style={{
        textAlign: "center",
      }}
    >
      <RiCheckboxCircleLine
        style={{
          fontSize: "128px",
          color: "var(--primary-color)",
        }}
      />
      <h1>Abbiamo ricevuto il tuo messaggio ;)</h1>
      <p>Grazie per averci scritto. Ti risponderemo dopo esserci puliti le mani dall'inchiostro.</p>
      <Link to="/" className="button">
        <RiArrowLeftSLine className="icon -left" />
        Nel frattempo, torna alla home
      </Link>
    </div>
  </>
)

export default Thanks
