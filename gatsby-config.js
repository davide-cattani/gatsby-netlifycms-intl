const netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
}

const settings = require("./src/util/site.json")

module.exports = {

  flags: { PRESERVE_WEBPACK_CACHE: true },

  siteMetadata: settings.meta,
  plugins: [
    `gatsby-plugin-preact`,
    // {
    //   resolve: `gatsby-plugin-layout`,
    //   options: {
    //     component: require.resolve(`./src/components/layout.js`),
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/`,
        name: `content`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          netlifyCmsPaths,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1600,
              showCaptions: true,
              linkImagesToOriginal: false,
              tracedSVG: true,
              loading: "lazy",
              withWebp: true
            },
          },
        ],
      },
    },
    `gatsby-transformer-remark-frontmatter`,
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`, `it`],
        // language file path
        defaultLanguage: `en`,
        // option to redirect to `/en` when connecting `/`
        redirect: true,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Simonetta Cattini`,
        short_name: `simonetta-cattini`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: "static" + settings.meta.logo,
      },
    },
    //"gatsby-plugin-offline",
  ],
}
