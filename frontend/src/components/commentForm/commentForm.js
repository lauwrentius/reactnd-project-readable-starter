import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import { addComment, editComment } from 'actions'

/**
* @description Displays comment form for user to edit/add comments.
*/
class CommentForm extends Component {
  static propTypes = {
    /** comment id to be displayed */
    id: PropTypes.string,
    /** post id where the comment belongs */
    parentId: PropTypes.string
  }
  state = {
    body: "",
    author: "",
    editComment: false
  }

  /**
  * @description populate the form on edit mode.
  */
  componentWillMount = () => {
    const {id, comments} = this.props
    const comment = comments[id]

    if(this.props.id !== undefined){
      this.setState({
        body: comment.body,
        author: comment.author,
        editComment: true
      })
    }
  }

  /**
  * @description Clear the form whenever a comment is succesfully added.
  */
  componentWillReceiveProps = (nextProps) => {
    if(Object.keys(this.props.comments).length < Object.keys(nextProps.comments).length)
      this.setState({body: "", author: ""})
  }

  /**
  * @description Controlled components event handler.
  */
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }

  /**
  * @description Triggered when the user cancels the current edit.
  */
  onCancel = () => {
    const { comments, id } = this.props
    const comment = Object.assign(comments[id], {editMode: false})
    this.props.editComment(comment)
  }

  /**
  * @description Triggered when the user submits the current edit.
  */
  onEdit = () => {
    const { comments, id } = this.props
    const { body } = this.state
    const comment = comments[id]
    const timestamp = comment.timestamp

    this.props.editComment({id, body, timestamp })
  }

  /**
  * @description Triggered when the user submits the current edit.
  */
  onAdd = () => {
    const { body, author } = this.state
    this.props.addComment({
      body,
      author,
      parentId: this.props.parentId
    })
  }
  /**
  * @description Renders the component.
  */
  render() {
    const { body, author, editComment } = this.state

    return <div className="commentForm">
        <div className="form-group">
          <textarea id="commentBody"
            className="form-control"
            rows="4" name="body"
            value={body} onChange={this.handleChange}
            placeholder="Comment"></textarea>
        </div>
        <div className="form-group">
          <input type="text"
            id="commentAuthor"
            className="form-control" name="author"
            value={author} onChange={this.handleChange}
            disabled={editComment}
            placeholder="Author" />
        </div>
        <div className="form-group text-right">
          {editComment &&
            <div className="btn-group">
              <button type="button" className="btn btn-xs btn-primary"
                onClick={this.onEdit}>
                <span className="glyphicon glyphicon-pencil"></span> Edit
              </button>
              <button type="button" className="btn btn-xs btn-default"
                onClick={this.onCancel}>
                <span className="glyphicon glyphicon-remove"></span> Cancel
              </button>
            </div>
          }
          {!editComment &&
            <button type="button" className="btn btn-xs btn-primary"
              onClick={this.onAdd}>
              <span className="glyphicon glyphicon-plus"></span> Add Comments
            </button>
          }
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
    editComment: (data) => dispatch(editComment(data)),
    addComment: (data) => dispatch(addComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)
