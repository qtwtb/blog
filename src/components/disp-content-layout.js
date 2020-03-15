import React from "react"
import { Link } from 'gatsby'

const Layout = (props) => {

    return (
        <Link to={`/post/${props.slug}`}>
            <h2>{props.title}</h2>
            <p>{props.intro}</p>
        </Link>
    )
}

export default Layout