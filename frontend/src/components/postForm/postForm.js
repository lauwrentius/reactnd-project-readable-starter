import React, { Component } from 'react';
import { connect } from 'react-redux'
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
    category: ""
  }

  /**
  * @description populate the form on post edit.
  */
  componentWillMount = () => {
    const {match} = this.props

    if(match.params.method === 'edit'){
      let id = match.params.param
      API.getPostDetails(id).then(res=>{
        console.log(res)
        this.setState({
          id,
          title: res.title,
          body: res.body,
          author: res.author,
          category: res.category
        })
      })
    }else{
      this.setState({category:match.params.param})
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
    const {match, history} = this.props
    const {id, title,body,author,category} = this.state

    if(match.params.method === 'edit'){
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

  /**
  * @description Renders the component.
  */
  render() {
    const {categories, match} = this.props
    const {title, body, author, category} = this.state

    return <div className="post-form row">
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
          name="author" disabled={match.params.method === 'edit'}
          onChange={this.handleChange}
          className="post-title form-control" />
        </div>
        <div className="form-group">
          <label>Categories</label>
          <select className="form-control" value={category}
            name="category" disabled={match.params.method === 'edit'}
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
            {`${match.params.method} Post`}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
