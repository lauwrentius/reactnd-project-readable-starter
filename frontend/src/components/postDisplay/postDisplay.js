import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap';

import { deletePost } from 'actions'
import API from 'utils/api'
import VoteScore from 'components/voteScore/voteScore'

/**
* @description Displays post info.
*/
class PostDisplay extends Component {
  static propTypes = {
    /** Post id to be displayed */
    id: PropTypes.string.isRequired
  }
  state = {
    /** Modal window state for post deletion prompt */
    show: false
  }

  /**
  * @description Triggered when the user confirms the deletion of the post.
  */
  onDelete = () => {
    const { posts, id, deletePost, history } = this.props
    const post = posts[id]

    API.deletePost(id).then(res=>{
      deletePost(post)
      history.push(`/`)
    })
  }

  /**
  * @description Renders the component.
  */
  render() {
    const { posts, id } = this.props
    const post = posts[id]

    if( post === undefined )
      return ''

    if( post.error ){
      return <div className="postEntry">
      <h4 className="title">[Post not found]</h4>
        </div>
    }
    return <div className="postEntry">
      <Modal show={this.state.show} onHide={()=>this.setState({show:false})}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <b><i>{post.title}</i></b> post?
        </Modal.Body>
        <Modal.Footer>
          <div className="btn-group" role="group" aria-label="group-prompt">
            <button type="button" className="btn btn-danger"
              onClick={this.onDelete}>
              <span className="glyphicon glyphicon-trash"></span> Delete
            </button>
            <button type="button" className="btn btn-default"
              onClick={()=>this.setState({show:false})}>
              <span className="glyphicon glyphicon-remove"></span> Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <VoteScore id={post.id} score={post.voteScore}></VoteScore>
        <div className="postContent">
          <h4 className="title">
             <Link to={'/postDetail/'+post.id}>
              {post.title}
             </Link>
          </h4>
          <div className="info">
            <span className="date">
              {new Date(post.timestamp).toString().substring(0, 15)}
            </span>,&nbsp;
            <span className="author">by {post.author}</span><br />
            <Link to={'/cat/'+post.category} className="category">
              {post.category}
            </Link>&nbsp;
            <span className="comments">({post.commentCount}&nbsp;
              comment{(post.commentCount >= 2)? 's':''})
            </span><br />
            <div className="btn-group">
              <Link to={`/post/edit/${post.id}`} className="btn btn-xs btn-default">
                <span className="glyphicon glyphicon-pencil"></span> Edit
              </Link>
              &nbsp;&nbsp;
              <button className="btn btn-xs btn-default"
                onClick={()=>this.setState({show:true})}>
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
function mapStateToProps ({ posts }) {
  return {
    posts: posts
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDisplay))
