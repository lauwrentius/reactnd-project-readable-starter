import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editComment, deleteComment } from 'actions'
import VoteScore from 'components/voteScore/voteScore'
import CommentForm from 'components/commentForm/commentForm'
import API from 'utils/api'

class CommentDisplay extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }
  onEdit = () => {
    const { comments, id } = this.props
    let comment = Object.assign({}, comments[id]);
    comment.editMode = true
    this.props.editComment(comment)
  }
  onDelete = (e) => {
    API.deleteComment(this.props.id).then(res=>{
      console.log(res)
      this.props.deleteComment(res)
    })
  }

  render() {
    const { comments, id } = this.props
    const comment = comments[id]

    if(comment === undefined)
      return ''

    if(comment.editMode)
      return <div className="commentEntry well row edit">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <CommentForm id={comment.id}>
            </CommentForm>
          </div>
        </div>

    return <div className="commentEntry well">
      <VoteScore type="comment" id={comment.id} score={comment.voteScore}></VoteScore>
      <div className="commentContent">
        <div className="commentBody">
          {comment.body}
        </div>
        <div className="info">
          <span className="date">
            {new Date(comment.timestamp).toString().substring(0, 15)}
          </span>,&nbsp;
          <span className="author">by {comment.author}</span><br />
          <div className="btn-group">
            <button className="btn btn-xs btn-default"
              onClick={this.onEdit}>
              <span className="glyphicon glyphicon-pencil"></span> Edit
            </button>
            <button className="btn btn-xs btn-default" onClick={this.onDelete}>
              <span className="glyphicon glyphicon-remove"></span> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments: comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    // clearComment: () => dispatch(clearComment())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDisplay)
