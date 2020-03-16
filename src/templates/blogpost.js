import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"

export default ({ data }) => {
  console.log(data.allContentfulBlogPost.edges[0].node.categories)
  let content = data.allContentfulBlogPost.edges[0]
  let title   = content.node.title
  let introduction = content.node.introduction
  let html = content.node.childContentfulBlogPostMarkdownTextNode.childMarkdownRemark.html
  let tags = data.allContentfulBlogPost.edges[0].node.categories

  if(content.node.headMedia == null){
    content.node.headMedia = {
      file: {
        url: 'https://66.media.tumblr.com/d82ae4d72c20c8604eb3a0a393352403/tumblr_n4yj9eLpGi1qfirfao1_1280.jpg'
      }
    }
  }

  let imgSource = content.node.headMedia.file.url

  return (
    <Layout>
    <SEO title={title} description={introduction}></SEO>
      <div className='title-and-intro'>
        <h1>{title}</h1>
        <p>{introduction}</p>
        <p className='created-at'>Created At: {content.node.createdAt}</p>
        <hr />
        <img src={imgSource} />
      </div>
      <div className='post-body' dangerouslySetInnerHTML={{__html: html}}></div>
      <div className='toggled-tags'>
        <h2>Toggled Tags:</h2>
        <div>
          {
            tags.map(tag => (
              <p className='tags-blogpost-js'><a href={`/category/${tag.slug}`}>{tag.tag}</a></p>
            ))
          }
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        h1 {
              margin-top: 5vh !important;
              margin-bottom: 3vh !important;
              text-align: start;
            }
      `}} />
    </Layout>
  )
}

export const query = graphql`
  query($slugPath: String!) {
    allContentfulBlogPost(filter: {slug: {eq: $slugPath}}) {
      edges {
        node {
          childContentfulBlogPostMarkdownTextNode {
            childMarkdownRemark {
              html
            }
          }
          title
          slug
          createdAt(formatString: "YYYY/MM/DD")
          introduction
          categories {
            tag
            slug
          }
          headMedia {
            file {
              url
            }
          }
        }
      }
    }
  }
`

// query MyQuery {
//   allContentfulBlogPost {
//     edges {
//       node {
//         categories {
//           title
//         }
//       }
//     }
//   }
// }
