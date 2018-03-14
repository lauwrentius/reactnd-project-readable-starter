import React, { Component } from 'react';
import PropTypes from 'prop-types'

class CommentForm extends Component {
  render() {
    return <div className="commentForm">
        <div className="form-group">
          <textarea id="commentBody"
            className="form-control"
            rows="4"
            placeholder="Comment"></textarea>
        </div>
        <div className="form-group">
          <input type="text"
            id="commentAuthor"
            className="form-control"
            placeholder="Author" />
        </div>
        <div className="form-group text-right">
          <button type="text"
            id="submitComment"
            className="btn btn-xs btn-default">
            Submit</button>
        </div>
      </div>
  }
}
export default CommentForm
