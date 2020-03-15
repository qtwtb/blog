import React from "react"
import RenderPost from '../components/renderPost'
import Layout from "../components/layout"
import { graphql, StaticQuery } from "gatsby"
import SEO from "../components/seo"
import Header from "../components/header"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import { TiFeather } from 'react-icons/ti'

import './category.scss'

class Category extends React.Component {
    constructor(props){
      super(props)
      let edges = this.props.data.allContentfulBlogPost.edges
      edges.map(({ node }) => {
        if(node.headMedia == null){
          node.headMedia = {
            file: {
              url: 'https://cdn3.iconfinder.com/data/icons/multimedia-ver-3-glyph/32/picture_images_photo_image_camera-128.png'
            }
          }
        }
      })

      this.state = {
        edges: edges
      }
    }

    componentDidMount(){
    }
    
    render(){
      return (
        <Layout addClassName={'category-js'}>        
          <h1>Articles belong to '{this.props.pageContext.tagName}' category.</h1>
            {/* <Button variant='primary'>Push me!</Button> 
          <TiFeather className='tifeather-categoryjs' /> */}
            <SEO title={this.props.pageContext.tagName}></SEO>
            {
                this.state.edges.map(({ node }) => (
                  <RenderPost 
                    to={node.slug} 
                    title={node.title} 
                    introduction={node.introduction} 
                    imgUrl={node.headMedia.file.url} 
                    createdAt={node.createdAt}
                    key={node.slug}
                    className={'render-post'}
                    tags={node.categories}
                  />
                ))
            }
        </Layout>
    )
    }
}


export default Category


export const query = graphql`
        query($tagName: String!){
          allContentfulBlogPost(filter: {categories: {elemMatch: {tag: {eq: $tagName}}}}) {
            edges {
              node {
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

// export default ({ data, pageContext }) => {
//     let edges = data.allContentfulBlogPost.edges
//     edges.map(({ node }) => {
//       if(node.headMedia == null){
//         node.headMedia = {
//           file: {
//             url: 'https://cdn3.iconfinder.com/data/icons/multimedia-ver-3-glyph/32/picture_images_photo_image_camera-128.png'
//           }
//         }
//       }
//     })
//     return (
//         <Layout className='category-js'>        
//           <h1>Articles belong to '{pageContext.tagName}' category.</h1>
//             {/* <Button variant='primary'>Push me!</Button> 
//           <TiFeather className='tifeather-categoryjs' /> */}
//             <SEO title={pageContext.tagName}></SEO>
//             {
//                 edges.map(({ node }) => (
//                   <RenderPost 
//                     to={node.slug} 
//                     title={node.title} 
//                     introduction={node.introduction} 
//                     imgUrl={node.headMedia.file.url} 
//                     createdAt={node.createdAt}
//                   />
//                 ))
//             }
//         </Layout>
//     )
// }

