import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import { initComment } from 'actions'
import CommentDisplay from 'components/commentDisplay/CommentDisplay'
import CommentForm from 'components/commentForm/CommentForm'

/**
* @description Displays a list of comments for a post.
* Users are able to sort comments based on score and date,
* It also has a form to add new comments
*/
class CommentListings extends Component {
  state = {
    sort: 'NEW',
    sortArr: ["NEW","SCORE"]
  }

  /**
  * @description Initialize the comments
  */
  componentWillMount() {
    let id = this.props.match.params.id
    this.props.initComment(id)
  }

  /**
  * @description Triggered when the sort option is clicked
  */
  setSort = (e) =>{
    const sort = e.currentTarget.dataset.sort
    const comments = this.props.comments.sort((a,b) => {
      if(sort === 'NEW')
        return b.timestamp - a.timestamp

      return b.voteScore - a.voteScore
    })
    this.setState({comments, sort})
  }

  /**
  * @description returns a sorted array to be displaed by the component.
  */
  displayComments = () => {
    return this.props.comments.sort( (a,b) => {
      if(this.state.sort === 'NEW')
        return b.timestamp - a.timestamp

      return b.voteScore - a.voteScore
    })
  }

  /**
  * @description Renders the component.
  */
  render() {
    const { post } = this.props
    const { sort, sortArr } = this.state

    if(post === undefined)
      return ''

    return <div className="commentListings">
        <h4>Comments</h4>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <CommentForm parentId={post.id}></CommentForm>
          </div>
        </div>
        <div className="sort-well well">
          sort by:&nbsp;
          {sortArr.map((s,i)=> (
            <span key={i}><a data-sort={s}
              className={(sort === s)?'curr':''}
              onClick={this.setSort}>{s}</a>&nbsp;</span>
          ))}
        </div>
        <div className="commentsDisplay">
          {this.displayComments().map((comment) => (
            <CommentDisplay key={comment.id} id={comment.id}>
            </CommentDisplay>
          ))}
        </div>
      </div>
  }
}

/**
* @description Connects the store to the component.
*/
function mapStateToProps ({ posts, comments }) {
  return {
    post: Object.values(posts)[0],
    comments: Object.values(comments)
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    initComment: (data) => dispatch(initComment(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListings))
