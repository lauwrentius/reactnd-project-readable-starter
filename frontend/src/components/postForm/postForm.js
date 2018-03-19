import React, { Component } from 'react';
import { connect } from 'react-redux'
// import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import { deletePost } from 'actions'
import API from 'utils/api'
import VoteScore from 'components/voteScore/voteScore'


class PostForm extends Component {
  state = {
    editMode: false,
    id: "",
    title: "",
    body: "",
    author: "",
    category: ""
  }

  componentWillMount = () => {
    const {match} = this.props
    console.log(this.props)
    if(match.params.method === 'edit'){
      let id = match.params.param
      API.getPostDetails(id).then(res=>{
        console.log(res)
        this.setState({
          id,
          title: res.title,
          body: res.body,
          author: res.author,
          category: res.category,
          editMode: true
        })
      })
    }else{
      this.setState({category:match.params.param})
    }
  }
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit = (e) => {
    const {match, history} = this.props
    const {id, title,body,author,category,editMode} = this.state

    if(editMode){
      API.editPost(id, {title, body})
        .then(res=>{
          history.push(`/postDetail/${id}`)
        })
    }else{
      API.addPost({
        id: uuidv1(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
      }).then(res =>{
        history.push(`/postDetail/${res['id']}`)
      })
    }
  }
  render() {
    const {categories, match} = this.props
    const {title, body, author, category, editMode} = this.state

    return <div className="post-form container">
        <div className="row">
        <div className="col-md-8">
          <h3>{`${match.params.method} Post`}</h3>
          <div className="form-group">
            <label>Post Title</label>
            <input type="text" value={title}
            name="title"
            onChange={this.handleChange}
            className="post-title form-control" />
          </div>
          <div className="form-group">
            <label>Post Body</label>
            <textarea rows="4" value={body}
            name="body"
            onChange={this.handleChange}
            className="post-body form-control" />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input type="text" value={author}
            name="author" disabled={editMode}
            onChange={this.handleChange}
            className="post-title form-control" />
          </div>
          <div className="form-group">
            <label>Categories</label>
            <select className="form-control" value={category}
              name="category" disabled={editMode}
              onChange={this.handleChange}>
              {categories.map(cat=>
                <option key={cat['path']} value={cat['path']}>
                  {cat['name']}
                </option>
              )}
            </select>
          </div>
          <div className="form-group text-right">
            <button className="btn btn-primary" onClick={this.onSubmit}>
              {`${match.params.method} Post`}
            </button>
          </div>
        </div>
      </div>
      {JSON.stringify(this.props)}
    </div>
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: Object.values(categories)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // addCategory: (data) => dispatch(addCategory(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
