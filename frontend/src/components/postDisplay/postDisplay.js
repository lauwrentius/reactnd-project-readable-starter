import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import { getPosts } from 'utils/api'
import VoteScore from 'components/voteScore/voteScore'


class PostDisplay extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }
  render() {
    const { post } = this.props
    
    if( !post )
      return ''
      
    return <div className="postEntry">
      <VoteScore id={post.id} score={post.voteScore}></VoteScore>
        <div className="postContent">
          <h4 className="title">
             <Link to={'/post/'+post.id}>
              {post.title}
             </Link>
          </h4>
          <div className="info">
            <span className="date">
              {new Date(post.timestamp).toString().substring(0, 15)}
            </span>,&nbsp;
            <span className="author">by {post.author}</span><br />
            <Link to={'/cat/'+post.category} className="category">
              {post.category}
            </Link>&nbsp;
            <span className="comments">({post.commentCount}&nbsp;
              comment{(post.commentCount >= 2)? 's':''})
            </span><br />
            <div className="btn-group">
              <button className="btn btn-xs btn-default"><span className="glyphicon glyphicon-pencil"></span> Edit</button>
              &nbsp;&nbsp;
              <button className="btn btn-xs btn-default"><span className="glyphicon glyphicon-remove"></span> Delete</button>
            </div>  
          </div>
        </div>
      </div>
  }
}

export default PostDisplay
