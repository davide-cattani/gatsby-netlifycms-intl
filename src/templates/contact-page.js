/** @jsx jsx */
import {useState} from "react"
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { navigate } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"

const endpoints = {
  contact: "/.netlify/functions/sendEmail",
}
const axios = require("axios")

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    setLoading(true);

    let data = { name, email, subject, message }

    console.log(data);

    axios.post(endpoints.contact, JSON.stringify(data)).then(response => {
      if (response.status !== 200) {
        handleError()
      } else {
        handleSuccess()
      }
    })
    e.preventDefault()
  }

  const handleSuccess = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setLoading(false);
    setError(false);

    navigate("/thanks/")
  }

  const handleError = msg => {
    setLoading(false);
    setError(true);
  }


  return (
    <Layout className="contact-page" sx={contactStyles.contactPage}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <div className="wrapper">
        <h1>{frontmatter.title}</h1>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>
              Name
              <input type="text" name="name" required value={name} onChange={e => setName(e.target.value)}/>
            </label>
          </p>
          <p>
            <label>
              Email
              <input type="email" name="email" required value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
          </p>
          <p>
            <label>
              Subject
              <input type="text" name="subject" required value={subject} onChange={e => setSubject(e.target.value)}/>
            </label>
          </p>
          <p>
            <label>
              Message<textarea name="message" required value={message} onChange={e => setMessage(e.target.value)}></textarea>
            </label>
          </p>
          <p className="text-align-right">
            <button
              className="button"
              sx={{
                variant: "variants.button",
              }}
              type="submit"
            >
              Send Message{" "}
              <span className="icon -right">
                <RiSendPlane2Line />
              </span>
            </button>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Contact

const contactStyles = {
  contactPage: {
    input: {
      border: "1px solid",
      borderColor: "inputBorder",
      bg: "inputBackground",
      outline: "none",
    },
    textarea: {
      border: "1px solid",
      borderColor: "inputBorder",
      bg: "inputBackground",
      outline: "none",
    },
  },
}
