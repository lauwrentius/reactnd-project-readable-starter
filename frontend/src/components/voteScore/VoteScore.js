import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editPost, editComment } from 'actions'
import API from 'utils/api'

/**
* @description Displays the score for the current post/comments.
* Users are able to upvote./downvote the  post/comments.
*/
class VoteScore extends Component {
  static propTypes = {
    /** The post/comment id */
    id: PropTypes.string.isRequired,
    /** The post/comment score */
    score: PropTypes.number.isRequired,
    /** The type of component (post/comments)  */
    type: PropTypes.string
  }
  /**
  * @description Triggered when the user clicks upvote/downvote.
  */
  votePost = (e) =>{
    let option = e.currentTarget.dataset.vote
    if(this.props.type === 'comment'){
      API.voteComment(this.props.id, {option})
        .then(res => {
          this.props.editComment(res)
        })
    }else{
      API.votePost(this.props.id, {option})
        .then(res => {
          this.props.editPost(res)
        })
    }
  }

  /**
  * @description This function will render the application.
  */
  render(){
    const { score } = this.props

    return <div className="voteScore">
          <span onClick={this.votePost} data-vote="upVote"
            className="upvote glyphicon glyphicon-thumbs-up"></span>
          <div className="score">{score}</div>
          <span onClick={this.votePost} data-vote="downVote"
          className="downvote glyphicon glyphicon-thumbs-down"></span>
        </div>
  }
}

/**
* @description Connects the store to the component.
*/
function mapStateToProps () {
  return {
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    editPost: (data) => dispatch(editPost(data)),
    editComment: (data) => dispatch(editComment(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteScore)
