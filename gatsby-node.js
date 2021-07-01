const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  actions.createFieldExtension({
    name: "md",
    args: {
      from: {
        type: "String!",
        defaultValue: true,
      },
    },

    extend() {
      return {
        args: {
          from: "String!",
        },
        resolve(source, args) {
          const fieldValue = source[args.from]
          return convertToHTML(fieldValue)
        },
      }
    },
  })
  const typeDefs = `
    type MarkdownRemark implements Node @infer {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      it: Lang
      en: Lang
    }
    type Lang {
      body: String @md
    }
  `
  actions.createTypes(typeDefs)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const paintingList = path.resolve(`./src/templates/painting-list-page.js`)
  const eventList = path.resolve(`./src/templates/event-list-page.js`)

  const allPages = await graphql(`
    {
      posts: allMarkdownRemark(filter: { frontmatter: { it: { type: { eq: "post" } } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              it {
                type
              }
            }
          }
        }
      }
      pages: allMarkdownRemark(filter: {frontmatter: {it: {type: {eq: "page"}}}}) {
        edges {
          node {
            id
            frontmatter {
              it {
                slug
                template
                type
              }
            }
          }
        }
      }
    }
  `)

  const locales = ["it/", "en/"]

  locales.forEach(locale => {

    // Create markdown pages
    const posts = allPages.data.posts.edges

    posts.forEach((post, index) => {
      const id = post.node.id

      createPage({
        path: locale + post.node.fields.slug,
        component: path.resolve(`src/templates/post.js`),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Create index pages
    const pages = allPages.data.pages.edges
    pages.forEach((page, index) => {
      const id = page.node.id
      createPage({
        path: "/" + locale + page.node.frontmatter.it.slug,
        component: path.resolve(`src/templates/${String(page.node.frontmatter.it.template)}.js`),
        context: {
          id,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
