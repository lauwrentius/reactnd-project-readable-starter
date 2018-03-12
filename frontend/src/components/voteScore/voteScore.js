import React, { Component } from 'react';
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

class VoteScore extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }
  render(){
    const { post } = this.props

    return <div className="voteScore">
          <span className="upvote glyphicon glyphicon-thumbs-up"></span>
          {post.voteScore}
          <span className="downvote glyphicon glyphicon-thumbs-down"></span>
        </div>
  }
}

export default VoteScore
