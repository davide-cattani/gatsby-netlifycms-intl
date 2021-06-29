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
      technique: String
      dimensions: String
      buy_link: String
      number: String
      direct_sale: Boolean
      image: File
      featuredImage: File
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
      paintings: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { template: { eq: "painting" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              template
              title
            }
          }
        }
      }
      events: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { template: { eq: "event" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              template
              title
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
  const paintings = allPages.data.paintings.edges
  let paintingCount = 0

  paintings.forEach((post, index) => {
    const id = post.node.id
    const previous = index === paintings.length - 1 ? null : paintings[index + 1].node
    const next = index === 0 ? null : paintings[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`src/templates/${String(post.node.frontmatter.template)}.js`),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })
    // Count artists.
    if (post.node.frontmatter.template === "painting") {
      paintingCount++
    }
  })

  // Create painting index pages
  const paintingsPerPage = 12
  const numPages = Math.ceil(paintingCount / paintingsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/paintings` : `/paintings/${i + 1}`,
      component: paintingList,
      context: {
        limit: paintingsPerPage,
        skip: i * paintingsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create events index pages
  const eventsCount = allPages.data.events.edges.length

  const eventsPerPage = 6
  const eventNumPages = Math.ceil(eventsCount / eventsPerPage)

  Array.from({ length: eventNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/events` : `/events/${i + 1}`,
      component: eventList,
      context: {
        limit: eventsPerPage,
        skip: i * eventsPerPage,
        eventNumPages,
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
