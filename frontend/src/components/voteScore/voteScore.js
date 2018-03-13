import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editPost } from 'actions'

import { votePost } from 'utils/api'

class VoteScore extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }
  votePost = (e) =>{
    console.log(e.currentTarget.dataset.vote)
    votePost(this.props.post.id, e.currentTarget.dataset.vote)
      .then(res => {
        console.log("ASD", res, this.props)
        this.props.editPost(res)
      })
  }

  render(){
    const { post } = this.props

    return <div className="voteScore">
          <a href onClick={this.votePost} data-vote="upVote"
            className="upvote glyphicon glyphicon-thumbs-up"></a>
          <div className="score">{post.voteScore}</div>
          <a href onClick={this.votePost} data-vote="downVote"
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
    editPost: (data) => dispatch(editPost(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteScore)
