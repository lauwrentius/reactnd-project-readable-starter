import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { clearPost, addPost, addComment, clearComment } from 'actions'
import PostDisplay from 'components/postDisplay/postDisplay'
import CommentDisplay from 'components/commentDisplay/commentDisplay'
import CommentForm from 'components/commentForm/commentForm'
import CommentListings from 'components/commentListings/commentListings'
import API from 'utils/api'


class PostDetails extends Component {
  state = {
    comments: [],
    sort: 'date'
  }
  componentWillMount() {
    let id = this.props.match.params.id

    this.props.clearPost()
    API.getPostDetails(id).then(res=>{
      console.log("DETAILS",res)
      this.props.addPost(res)
    })
  }
  setSort = (e) =>{
    let sort = e.currentTarget.dataset.sort
    let comments = this.state.comments.sort((a,b) => {
      if(sort === 'date')
        return b.timestamp - a.timestamp

      return b.voteScore - a.voteScore
    })
    this.setState({comments, sort})
  }
  displayComments = () => {
    return this.props.comments.sort( (a,b) => {
      if(this.state.sort === 'date')
        return b.timestamp - a.timestamp

      return b.voteScore - a.voteScore
    })
  }
  render() {
    const { post, comments } = this.props
    const { sort } = this.state
    // const details = (post.body !== undefined) ? (
    //     <div>
    //       <div className="postBody well">{post.body}</div>
    //       <CommentListings></CommentListings>
    //     </div>
    //   ):('')

    if( !post )
      return ''

    return <div className="postDetails container">
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

function mapStateToProps ({ posts, comments }) {
  return {
    post: Object.values(posts)[0],
    comments: Object.values(comments)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    clearPost: () => dispatch(clearPost()),
    addComment: (data) => dispatch(addComment(data)),
    clearComment: () => dispatch(clearComment())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
