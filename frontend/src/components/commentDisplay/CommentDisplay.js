import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateComment, deleteComment } from 'actions'
import VoteScore from 'components/voteScore/VoteScore'
import CommentForm from 'components/commentForm/CommentForm'

/**
* @description Displays a single block of comment.
* It also displays comment form for editing comment
*/
class CommentDisplay extends Component {
  static propTypes = {
    /** comment id */
    id: PropTypes.string.isRequired,
  }

  /**
  * @description Update (dispatch to the store) comment to an edit mode.
  */
  onEdit = () => {
    const { comments, id } = this.props
    const comment = Object.assign(comments[id], {editMode: true});
    this.props.updateComment(comment)
  }

  /**
  * @description Delete comment click event.
  */
  onDelete = (e) => {
    this.props.deleteComment(this.props.id)
  }

  /**
  * @description Renders the component.
  */
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

/**
* @description Connects the store to the component.
*/
function mapStateToProps ({ comments }) {
  return {
    comments: comments
  }
}
/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    updateComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDisplay)
