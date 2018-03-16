import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import { addPost, clearPost } from 'actions'
import API from 'utils/api'

import PostDisplay from 'components/postDisplay/postDisplay'

class PostListings extends Component {
  state = {
    sort: 'score'
  }
  componentWillMount() {
    this.loadPost()
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.location.pathname !== prevProps.location.pathname)
      this.loadPost()
  }

  loadPost(){
    let path = this.props.history.location.pathname
    let cat =  path.split('/')

    this.props.clearPost()

    if(path === '/'){
      API.getPosts().then(res=>{
        res.map(post=>this.props.addPost(post))
      })
    }
    if(cat[1] === 'cat'){
      API.getPosts(cat[2]).then(res=>{
        res.map(post=>this.props.addPost(post))
      })
    }
  }
  setSort = (e) => {
    this.setState({sort: e.currentTarget.dataset.sort})
  }
  currSort = (type) => {
    return (type === this.state.sort)?'curr':''
  }

  displayPost = () => {
    return this.props.posts.sort( (a,b) => {
      if(this.state.sort === 'date')
        return b.timestamp - a.timestamp

      if(this.state.sort === 'score')
        return b.voteScore - a.voteScore

      return a.title.localeCompare(b.title);
    })
  }

  render() {
    const { posts } = this.props
    const { sort } = this.state

    return (<div className="container postListings">
        <div className="row">
          <div className="col-xs-12">
            <div className="sort-well well">
              sort by:&nbsp;
              <a data-sort='date'
                className={(sort === 'date')?'curr':''}
                onClick={this.setSort}>NEW</a>&nbsp;
              <a data-sort='score'
                className={(sort === 'score')?'curr':''}
                onClick={this.setSort}>SCORE</a>&nbsp;
              <a data-sort='title'
                className={(sort === 'title')?'curr':''}
                onClick={this.setSort}>TITLE</a>
              <div className="pull-right">
                <button className="btn btn-sm btn-primary">
                  Add Post <span className="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-xs-12">
            {this.displayPost().map(p=>{
              return <PostDisplay key={p.id} post={p}></PostDisplay>
            })}
          </div>
        </div>
      </div>)
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories: categories,
    posts: Object.values(posts)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    clearPost: () => dispatch(clearPost())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListings))
