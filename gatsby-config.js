const config = require("./data/siteConfig.js")

module.exports = {
  siteMetadata: {
    title: `さんぷる画像ジェネレーター`,
    description: `アプリいらずで、サンプル画像を簡単に作れるサイトです。色や大きさ、中の文字などを自由に編集することができます。簡易的なオリジナル画像を作る際にご利用ください！`,
    author: `@hatsu_38`,
    siteUrl: 'https://sample-image-generator.hatsu38.com/'
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID,
        head: true,
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `さんぷる画像ジェネレーター`,
        short_name: `さんぷる画像ジェンレーター`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
