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

    return <div className="postEntry">
        <VoteScore post={post}></VoteScore>
        <h4 className="title">
           <Link to={'/post/'+post.id}>
            {post.title}
           </Link>
        </h4>
        <div className="info">
          <span className="category">({post.category})</span>&nbsp;
          <span className="author">by {post.author}</span>&nbsp;
          <span className="comments">({post.commentCount}&nbsp;
            comment{(post.commentCount >= 2)? 's':''})
          </span>
        </div>
      </div>
  }
}

export default PostDisplay
