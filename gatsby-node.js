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
      coworkingDescription: String! @md
    }
  `
  actions.createTypes(typeDefs)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const artistList = path.resolve(`./src/templates/artist-list-page.js`)

  const allPages = await graphql(`
    {
      artists: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { template: { eq: "artist" } } }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
              fullname
            }
          }
        }
      }
      pages: allMarkdownRemark(filter: { frontmatter: { type: { eq: "page" } } }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              type
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (allPages.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create markdown pages
  const artists = allPages.data.artists.edges
  let artistCount = 0

  artists.forEach((post, index) => {
    const id = post.node.id
    const previous = index === artists.length - 1 ? null : artists[index + 1].node
    const next = index === 0 ? null : artists[index - 1].node

    createPage({
      path: "/artists/" + post.node.frontmatter.slug,
      component: path.resolve(`src/templates/${String(post.node.frontmatter.template)}.js`),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })
    // Count artists.
    if (post.node.frontmatter.template === "artist") {
      artistCount++
    }
  })

  // Create artist index pages
  const artistsPerPage = 12
  const numPages = Math.ceil(artistCount / artistsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/artists` : `/artists/${i + 1}`,
      component: artistList,
      context: {
        limit: artistsPerPage,
        skip: i * artistsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create index pages
  const pages = allPages.data.pages.edges
  pages.forEach((page, index) => {
    const id = page.node.id
    createPage({
      path: "/" + page.node.frontmatter.slug,
      component: path.resolve(`src/templates/${String(page.node.frontmatter.template)}.js`),
      context: {
        id,
      },
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
