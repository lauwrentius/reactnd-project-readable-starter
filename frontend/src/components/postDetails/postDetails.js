import React, { Component } from 'react';
import { connect } from 'react-redux'

import { clearPost, addPost } from 'actions'
import PostDisplay from 'components/postDisplay/postDisplay'
import CommentListings from 'components/commentListings/commentListings'
import API from 'utils/api'

/**
* @description Displays post body and its comments.
*/
class PostDetails extends Component {
  /**
  * @description Loads the comments from api
  */
  componentWillMount() {
    let id = this.props.match.params.id

    this.props.clearPost()
    API.getPostDetails(id).then(res=>{
      this.props.addPost(res)
    })
  }

  /**
  * @description Renders the component.
  */
  render() {
    const { post } = this.props

    if( !post )
      return ''

    return <div className="postDetails">
      <PostDisplay post={post}></PostDisplay>
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
    post: Object.values(posts)[0]
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    clearPost: () => dispatch(clearPost())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
