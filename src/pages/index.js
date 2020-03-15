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
          url: 'https://cdn3.iconfinder.com/data/icons/multimedia-ver-3-glyph/32/picture_images_photo_image_camera-128.png'
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
