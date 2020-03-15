/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

// exports.onCreateNode = ({ node, getNode, actions }) => {
//     const { createNodeField } = actions
//     if(node.internal.type == 'ContentfulBlogPost') {
//         const slug = createFilePath({ node, getNode, basePath: 'pages'})
//         console.log(slug)
//         createNodeField({
//             node,
//             name: 'slug',
//             value: slug
//         })
//     }
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
       {
            allContentfulBlogPost {
              edges {
                node {
                  childContentfulBlogPostMarkdownTextNode {
                    childMarkdownRemark {
                      html
                    }
                  }
                  title
                  slug
                  createdAt
                  introduction
                  categories {
                      tag
                      slug
                  }
                }
              }
            }
        }
  `)

  const tagResult = await graphql(`
    {
        allContentfulTag {
            edges {
                node {
                    tag
                    slug
                }
            }
        }
    }
  `)

  // const PageTemplate = require('./src/templates/Page')

  await result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    console.log(node.slug)
    createPage({
      path: `/post/${node.slug}`,
      component: path.resolve("./src/templates/blogpost.js"),
      context: {
        slugPath: node.slug,
      },
    })
  })

  await tagResult.data.allContentfulTag.edges.forEach(({ node }) => {
      createPage({
          path: `/category/${node.slug}`,
          component: path.resolve('./src/templates/category.js'),
          context: {
              slugPath: node.slug,
              tagName: node.tag
          }
      })
  })
}
