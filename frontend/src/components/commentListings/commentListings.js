import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import { initComment, clearComment } from 'actions'
import CommentDisplay from 'components/commentDisplay/commentDisplay'
import CommentForm from 'components/commentForm/commentForm'
import API from 'utils/api'

class CommentListings extends Component {
  state = {
    sort: 'NEW',
    sortArr: ["NEW","SCORE"]
  }

  componentWillMount() {
    let id = this.props.match.params.id

    this.props.clearComment()
    API.getPostComments(id).then(res=>{
      this.props.initComment(res.reduce((obj,val)=> {
        obj[val.id]=val
        return obj
      },{}))
    })
  }
  setSort = (e) =>{
    let sort = e.currentTarget.dataset.sort
    let comments = this.props.comments.sort((a,b) => {
      if(sort === 'NEW')
        return b.timestamp - a.timestamp

      return b.voteScore - a.voteScore
    })
    this.setState({comments, sort})
  }
  displayComments = () => {
    return this.props.comments.sort( (a,b) => {
      if(this.state.sort === 'NEW')
        return b.timestamp - a.timestamp

      return b.voteScore - a.voteScore
    })
  }
  render() {
    const { post, comments } = this.props
    const { sort, sortArr } = this.state

    if(post === undefined)
      return ''

    const commentList =  this.displayComments().map(comment=>(
      <div key={comment.id}><CommentDisplay id={comment.id}>
      </CommentDisplay></div>))

    return <div className="commentListings">
        <h4>Comments</h4>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <CommentForm parentId={post.id}></CommentForm>
          </div>
        </div>
        <div className="sort-well well">
          sort by:&nbsp;
          {sortArr.map(s=> (
            <span><a data-sort={s}
              className={(sort === s)?'curr':''}
              onClick={this.setSort}>{s}</a>&nbsp;</span>
          ))}
        </div>
        <div className="commentsDisplay">
          <CSSTransitionGroup
          transitionName="example"
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
            {commentList}
          </CSSTransitionGroup>
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
    initComment: (data) => dispatch(initComment(data)),
    clearComment: () => dispatch(clearComment())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListings))
