import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import { clearPost, addPost, addComment, clearComment } from 'actions'
import PostDisplay from 'components/postDisplay/postDisplay'
import CommentDisplay from 'components/commentDisplay/commentDisplay'
import CommentForm from 'components/commentForm/commentForm'

import API from 'utils/api'


class PostDetails extends Component {
  state = {
    comments: [],
    sort: 'date'
  }
  componentWillMount() {
    let id = this.props.history.location.pathname.split('/')[2]
    this.props.clearPost()
    this.props.clearComment()

    API.getPostDetails(id).then(res=>{
      this.props.addPost(res)
    })
    API.getPostComments(id).then(res=>{
      this.setState({comments: res})
      res.map(comment=> this.props.addComment(comment))
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

    if( !post )
      return ''

    return <div className="postDetails container">

      <PostDisplay post={post}></PostDisplay>

      <div className="postBody well">{post.body}</div>

      <h4><b>Comments</b></h4>
      <div className="sort-well well">
        sort by:&nbsp;
        <a data-sort='date'
          className={(sort === 'date')?'curr':''}
          onClick={this.setSort}>NEW</a>&nbsp;
        <a data-sort='score'
          className={(sort === 'score')?'curr':''}
          onClick={this.setSort}>SCORE</a>&nbsp;
        <div className="pull-right">
          <button className="btn btn-sm btn-primary">
            <span className="glyphicon glyphicon-plus"></span> Add Comments
          </button>
        </div>
      </div>

      <div className="commentsDisplay">
        {this.displayComments().map(comment=>{
          return <CommentDisplay key={comment.id} comment={comment}></CommentDisplay>
        })}
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <CommentForm></CommentForm>
        </div>
      </div>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails))
