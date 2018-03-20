import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import { addComment, editComment } from 'actions'
import API from 'utils/api'

class CommentForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    parentId: PropTypes.string
  }
  state = {
    body: "",
    author: "",
    editComment: false
  }
  componentWillMount = () => {
    const {id, comments} = this.props
    const comment = comments[id]

    // console.log("MOUNT",comment)
    if(this.props.id !== undefined){
      this.setState({
        body: comment.body,
        author: comment.author,
        editComment: true
      })
    }
  }
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }
  onCancel = () => {
    const { comments, id } = this.props
    let comment = Object.assign({}, comments[id])
    comment.editMode = false
    this.props.editComment(comment)
  }
  onEdit = () => {
    const { comments, id } = this.props
    const { body } = this.state
    const comment = comments[id]
    let timestamp = comment.timestamp

    API.editComment(id, {body, timestamp}).then(res=>{
      res.editMode = false
      this.props.editComment(res)
    })
  }
  onAdd = () => {
    const { body, author } = this.state
    console.log(this.props.parentId)
    API.addComment({
        id: uuidv1(),
        timestamp: Date.now(),
        body,
        author,
        parentId: this.props.parentId
    }).then(res=>{
      console.log(res)
      this.setState({body: "", author:""});
      this.props.addComment(res)
    })
  }

  render() {
    const { comments, id } = this.props
    const { body, author, editComment } = this.state
    const comment = comments[id]

    // const {editMode} = this.state

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

function mapStateToProps ({ comments }) {
  return {
    comments: comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editComment: (data) => dispatch(editComment(data)),
    addComment: (data) => dispatch(addComment(data)),
    // clearComment: () => dispatch(clearComment())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)
