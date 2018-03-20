import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editPost, editComment } from 'actions'

import { PostDisplay } from 'components/postDisplay/postDisplay'
import API from 'utils/api'

class VoteScore extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    type: PropTypes.string
  }
  votePost = (e) =>{
    let option = e.currentTarget.dataset.vote
    if(this.props.type === 'comment'){
      API.voteComment(this.props.id, {option})
        .then(res => {
          console.log(res);
          this.props.editComment(res)
        })
    }else{
      API.votePost(this.props.id, {option})
        .then(res => {
          this.props.editPost(res)
        })
    }
  }

  render(){
    const { score } = this.props

    return <div className="voteScore">
          <a onClick={this.votePost} data-vote="upVote"
            className="upvote glyphicon glyphicon-thumbs-up"></a>
          <div className="score">{score}</div>
          <a onClick={this.votePost} data-vote="downVote"
          className="downvote glyphicon glyphicon-thumbs-down"></a>
        </div>
  }
}

function mapStateToProps ({}) {
  return {
  }
}
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
