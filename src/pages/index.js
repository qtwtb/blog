import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import RenderPost from '../components/renderPost'
import Image from "../components/image"
import SEO from "../components/seo"

import './index.scss'

export default ({ data }) => {
  const contentful = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost {
          edges {
            node {
              id
              title
              slug
              introduction
              createdAt(formatString: "YYYY/MM/DD")
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
  )

  contentful.allContentfulBlogPost.edges.map(({ node }) => {
    if(node.headMedia == null){
      node.headMedia = {
        file: {
          url: 'https://66.media.tumblr.com/d82ae4d72c20c8604eb3a0a393352403/tumblr_n4yj9eLpGi1qfirfao1_1280.jpg'
        }
      }
    }
  })


  return (
    <Layout>
      <SEO title='home' description={'Index menu'}></SEO>
      {contentful.allContentfulBlogPost.edges.map(edge => (
        <RenderPost 
          to={edge.node.slug} 
          title={edge.node.title} 
          introduction={edge.node.introduction} 
          imgUrl={edge.node.headMedia.file.url} 
          createdAt={edge.node.createdAt}
          tags={edge.node.categories}
        />
      ))}
    </Layout>
  )
}
