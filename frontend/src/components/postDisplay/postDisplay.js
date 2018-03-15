import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import { deletePost } from 'actions'
import * as API from 'utils/api'
import VoteScore from 'components/voteScore/voteScore'


class PostDisplay extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }
  onDelete = () => {
    const { post } = this.props
    
    // API.deletePost(post.id).then(res=>{
    //   console.log(res)
    //   deletePost(post.id)
      // editPost
    })

    // Object.assign({},
    //   ...Object.values(state)
    //     .filter(p=>{ p.id !== post.id })
    //     .map(p=> ({[p.id]:p})))
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
              <button className="btn btn-xs btn-default" onClick={this.onDelete}>
                <span className="glyphicon glyphicon-remove"></span> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDisplay)
