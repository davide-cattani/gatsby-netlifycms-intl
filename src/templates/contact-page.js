import React from "react"
import { graphql } from "gatsby"
import { navigate } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Contact = ({ data }) => {
  const { markdownRemark, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.title + " " + site.siteMetadata.title} />
      <section className="section">
        <div className="container is-max-desktop">
          <h1 className="title is-size-2">{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <form className="mt-6" name="contact" action="/thanks" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />

            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input className="input" type="text" name="name" required />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" name="email" required />
              </div>
            </div>
            <div className="field">
              <label className="label">Oggetto</label>
              <div className="control">
                <input className="input" type="text" name="subject" required />
              </div>
            </div>
            <div className="field">
              <label className="label">Messaggio</label>
              <div className="control">
                <textarea className="textarea" rows="5" name="message" required></textarea>
              </div>
            </div>

            <div className="buttons is-centered mt-5">
              <button className="button is-primary is-primary" type="submit">
                <span>Invia Messaggio </span>
                <span className="ml-1">
                  <RiSendPlane2Line />
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default Contact
