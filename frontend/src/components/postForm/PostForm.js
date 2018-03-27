import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPostDetails, addPost, editPost } from 'actions'

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
    editMode: false,
    prevlocation: ""
  }

  /**
  * @description populate the form on post edit.
  */
  componentWillMount = () => {
    const { match } = this.props
    const id = match.params.id
    const category = match.params.category

    if( id !== undefined){
      this.setState({editMode: true})

      this.props.fetchPostDetails(id).then(res=>{
        const post = res.post[id]

        if(post.error)
          return

        this.setState({
          id,
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category
        })
      })
    }else{
      this.setState({id, category})
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
    const {history, addPost, editPost} = this.props
    const {id, title, body, author, category, editMode} = this.state

    if(editMode){
      editPost({id,title,body}).then(res =>{
        const post = res.post
        history.push(`/${post.category}/${post.id}`)
      })
    }else{
      addPost({title,body,author,category}).then(res=>{
        const post = res.post
        history.push(`/${post.category}/${post.id}`)
      })
    }
  }

  /**
  * @description Renders the component.
  */
  render() {
    const {categories, posts} = this.props
    const {id, title, body, author, category, editMode} = this.state
    const post = posts[id]

    if(editMode){
      if( !post )
         return ''

      if( post.error )
        return <div className="postDetails well">
          <h4>Sorry, post not found.</h4></div>
    }else{
      if(category === '' && categories.length !== 0)
        this.setState({category: categories[0]['name']})
    }

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
function mapStateToProps ({ posts, categories }) {
  return {
    posts: posts,
    categories: Object.values(categories)
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    fetchPostDetails: (data) => dispatch(fetchPostDetails(data)),
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm))
