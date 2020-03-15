import React from "react"
import { Link, navigate } from "gatsby"

import './renderPost.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { node } from "prop-types"

// const RenderPost = (props) => (
//     <Link to={`/post/${props.to}`} 
//           className='link-to-post col-11 d-flex justify-content-center align-items-center m-auto'>
//         <div className='info-container border border-primary rounded col-12'>
//             <div className='string-container col-lg-8'>
//                     <div className='string-container-text'>
//                     <h3>{props.title}</h3>
//                     <p>{props.introduction}</p>
//                     <p className='created-at'>Created At: {props.createdAt}</p>
//                 </div>
//             </div>
//             <div className='img-container col-lg-4'>
//                 <img src={props.imgUrl} alt={'no img'} className='col-12' />
//             </div>
//         </div>
//     </Link>
// )

class RenderPost extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div  onClick={() => {navigate(`/post/${this.props.to}`)}} 
                  key={this.props.to}
          className='link-to-post col-11 d-flex justify-content-center align-items-center m-auto'>
                <div className='info-container border border-primary rounded col-12'>
                    <div className='img-container col-lg-4'>
                        <img src={this.props.imgUrl} alt={'no img'} className='col-12' />
                    </div>
                    <div className='string-container col-lg-8'>
                        <h3>{this.props.title}</h3>
                        <p>{this.props.introduction}</p>
                        <div className='tags-renderpost'>
                            <p>Tags:</p>
                            {this.props.tags.map(tag => (
                                <p className='inside-tags-renderpost'><a href={`./${tag.slug}`}>{tag.tag}</a></p>
                            ))}
                        </div>
                        <p className='created-at'>Created At: {this.props.createdAt}</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default RenderPost