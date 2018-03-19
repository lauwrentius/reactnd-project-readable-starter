import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import { addComment, clearComment } from 'actions'
import PostDisplay from 'components/postDisplay/postDisplay'
import CommentDisplay from 'components/commentDisplay/commentDisplay'
import CommentForm from 'components/commentForm/commentForm'
import API from 'utils/api'

class CommentListings extends Component {
  state = {
    comments: [],
    sort: 'date'
  }

  componentWillMount() {
    console.log("asdasdasdasdasd",this.props)

    let id = this.props.match.params.id
    // this.props.clearPost()
    this.props.clearComment()
    // console.log("COMMENTS",this.props)
    // API.getPostDetails(id).then(res=>{
    //   console.log("DETAILS",res)
    //   this.props.addPost(res)
    // })
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

    return <div className="commentListings">
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
    addComment: (data) => dispatch(addComment(data)),
    clearComment: () => dispatch(clearComment())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListings))
