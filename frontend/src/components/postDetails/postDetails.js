import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { clearPost, addPost } from 'actions'
import PostDisplay from 'components/postDisplay/postDisplay'
import CommentListings from 'components/commentListings/commentListings'
import API from 'utils/api'

/**
* @description Displays post body and its comments.
*/
class PostDetails extends Component {
  state = {
    notFound: false
  }
  /**
  * @description Loads the comments from api
  */
  componentWillMount() {
    let id = this.props.match.params.id

    this.props.clearPost()
    API.getPostDetails(id).then(res=>{
      if( Object.keys(res).length === 0)
        this.setState({notFound: true})

      this.props.addPost(res)
    })
  }

  /**
  * @description Renders the component.
  */
  render() {
    const { posts } = this.props
    const post = posts[this.props.match.params.id]

    if( this.state.notFound )
      return <Redirect to="/404" />

    if( Object.keys(posts).length === 0 || post === undefined )
      return ''

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
    addPost: (data) => dispatch(addPost(data)),
    clearPost: () => dispatch(clearPost())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
