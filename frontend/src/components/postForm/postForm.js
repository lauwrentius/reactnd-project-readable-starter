import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import API from 'utils/api'

/**
* @description Displays post form for user to edit/add post.
*/
class PostForm extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    author: "",
    category: "",
    editMode: false
  }

  /**
  * @description populate the form on post edit.
  */
  componentWillMount = () => {
    const { match } = this.props
    const id = match.params.id
    const category = match.params.category

    console.log(this.props.match)
    if( id !== undefined){
      API.getPostDetails(id).then(res=>{
        this.setState({
          id,
          title: res.title,
          body: res.body,
          author: res.author,
          category: res.category,
          editMode: true
        })
      })
    }
    if( category !== undefined ){
      this.setState({category})
    }
  }

  /**
  * @description Controlled components event handler.
  */
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  }

  /**
  * @description Triggered when the user submits the post.
  */
  onSubmit = (e) => {
    const {categories, history} = this.props
    const {id, title, body, author, category, editMode} = this.state
    const cat = (category === '')? categories[0].name:category

    if(editMode){
      API.editPost(id, {title, body})
        .then(res=>{
          history.goBack()
        })
    }else{
      API.addPost({
        id: uuidv1(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category: cat
      }).then(res =>{
        history.push(`/${res.category}/${res.id}`)
      })
    }
  }

  /**
  * @description Renders the component.
  */
  render() {
    const {categories} = this.props
    const {title, body, author, category, editMode} = this.state

    return <div className="post-form row">
      <div className="col-md-8">
        <h3>{editMode ? "Edit" : "Add"} Post</h3>
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
              <option key={cat['name']} value={cat['name']}>
                {cat['name']}
              </option>
            )}
          </select>
        </div>
        <div className="form-group text-right">
          <button className="btn btn-primary" onClick={this.onSubmit}>
            {editMode ? "Edit" : "Add"} Post
          </button>
        </div>
      </div>
    </div>
  }
}

/**
* @description Connects the store to the component.
*/
function mapStateToProps ({ categories }) {
  return {
    categories: Object.values(categories)
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm))
