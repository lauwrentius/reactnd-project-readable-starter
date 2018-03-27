import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { votePost, voteComment } from 'actions'

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
  vote = (e) =>{
    const { voteComment, votePost, id } = this.props
    const option = e.currentTarget.dataset.vote

    if(this.props.type === 'comment')
      voteComment({id, option})
    else
      votePost({id, option})
  }

  /**
  * @description This function will render the application.
  */
  render(){
    const { score } = this.props

    return <div className="voteScore">
          <span onClick={this.vote} data-vote="upVote"
            className="upvote glyphicon glyphicon-thumbs-up"></span>
          <div className="score">{score}</div>
          <span onClick={this.vote} data-vote="downVote"
          className="downvote glyphicon glyphicon-thumbs-down"></span>
        </div>
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    votePost: (data) => dispatch(votePost(data)),
    voteComment: (data) => dispatch(voteComment(data))
  }
}


export default connect(
  null,
  mapDispatchToProps
)(VoteScore)
