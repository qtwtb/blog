import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import './header.scss'
import { FaPizzaSlice } from 'react-icons/fa'
import { NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const Header = () => {
  const categoriesData = useStaticQuery(
    graphql`
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
    `
  )

  return (
    <header>
      <div className='nav-wrapper'>
        <div className='header-home'>
          <div className='header-container'>
            <Link className='header-link-to' to='/'>All Posts</Link>
            <a className='header-link-to' href='mailto:qtwtbob@gmail.com'>Contact Me</a>
            <NavDropdown title='Categories' className='header-nav-dropdown'>
              {
                categoriesData.allContentfulTag.edges.map(({ node }) => (
                  <NavDropdown.Item href={`/category/${node.slug}`} key={node.slug}>
                    {node.tag}
                  </NavDropdown.Item>
                ))
              }
            </NavDropdown>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
