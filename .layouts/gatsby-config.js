const path = require("path");
const pathPrefix = "/";
const siteMetadata = {
  title: "Everything I Know by Seopbo",
  shortName: "Wiki",
  description:
    "Personal wiki, share everything I learned, and spend a lifetime updating it. I hope it'll be a good gift for my grandchildren.",
  twitterName: "",
  imageUrl: "/second_brain.png",
  siteUrl: "https://seopbo.github.io",
};
module.exports = {
  siteMetadata,
  pathPrefix,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/..`,
        ignore: [`**/\.*/**/*`],
      },
    },
    {
      resolve: "gatsby-theme-primer-wiki",
      options: {
        icon: "./static/logo.png",
        sidebarComponents: ["latest", "tag"], // deploy
        // sidebarComponents: ["tag"], // for local test
        remarkPlugins: [require("remark-math")],
        rehypePlugins: [require("rehype-katex")],
        defaultIndexLatestPostCount: 15,
        searchBody: true,
        lastUpdatedTransformer: (isoString) => {
          const dateObj = new Date(isoString);
          const date = dateObj.toLocaleString("ko-KR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });
          return date;
        },
        nav: [
          //  Deploy, If you deploy by github pages, you'll remove "//""
          {
            title: "Latest",
            url: "/latest/",
          },
          {
            title: "About",
            items: [
              {
                title: "About",
                url: "/About/",
              },
              {
                title: "Github",
                url: "https://github.com/seopbo",
              },
              {
                title: "Source Code",
                url: "https://github.com/seopbo/seopbo.github.io",
              },
            ],
          },
        ],
        editUrl: "https://github.com/seopbo/seopbo.github.io/tree/main/",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.shortName,
        start_url: pathPrefix,
        background_color: `#f7f0eb`,
        display: `standalone`,
        icon: path.resolve(__dirname, "./static/logo.png"),
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [],
      },
    },
  ],
};