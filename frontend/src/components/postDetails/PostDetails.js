import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchPostDetails } from 'actions'
import PostDisplay from 'components/postDisplay/PostDisplay'
import CommentListings from 'components/commentListings/CommentListings'

/**
* @description Displays post body and its comments.
*/
class PostDetails extends Component {
  /**
  * @description Fetch the comments
  */
  componentWillMount() {
    this.props.fetchPostDetails(this.props.match.params.id)
  }

  /**
  * @description Renders the component.
  */
  render() {
    const { posts } = this.props
    const post = posts[this.props.match.params.id]

    if( !post )
      return ''

    if( post.error )
      return <div className="postDetails well">
        <h4>Sorry, post not found.</h4></div>

    return <div className="postDetails">
      <PostDisplay id={post.id}></PostDisplay>
      {post.body &&
        <div>
          <div className="postBody well">{post.body}</div>
          <CommentListings></CommentListings>
        </div>
      }
    </div>
  }
}

/**
* @description Connects the store to the component.
*/
function mapStateToProps ({ posts, comments }) {
  return {
    posts: posts
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    fetchPostDetails: (data) => dispatch(fetchPostDetails(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
