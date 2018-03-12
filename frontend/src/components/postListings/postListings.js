import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

import { addPost, clearPost } from 'actions'
import { getPosts } from 'utils/api'

import PostDisplay from 'components/postDisplay/postDisplay'

class PostListings extends Component {
  state = {
    sort: 'score'
  }
  constructor(props) {
    super(props);
    this.loadPost()

    this.props.history.listen((location, action) => {
      this.loadPost()
    });

  }
  loadPost(){
    let path = this.props.history.location.pathname
    let cat =  path.split('/')

    this.props.clearPost()

    if(path === '/'){
      getPosts().then(res=>{
        res.map(post=>this.props.addPost(post))
      })
    }
    if(cat[1] === 'cat'){
      getPosts(cat[2]).then(res=>{
        res.map(post=>this.props.addPost(post))
      })
    }
  }
  setSort = (type) => {
    this.setState({sort: type})
  }
  currSort = (type) => {
    return (type === this.state.sort)?'curr':''
  }

  displayPost = () => {
    console.log(this.state.sort)

    return this.props.posts.sort( (a,b) => {
      if(this.state.sort === 'date')
        return a.timestamp - b.timestamp

      if(this.state.sort === 'score')
        return a.voteScore - b.voteScore

      return a.title - b.title
    })
  }

  render() {
    const { posts } = this.props

    return (<div className="container postListings">
        <div className="row">
          <div className="col-xs-12">
            sort by:&nbsp;
            <a href="#" className={this.currSort('date')} onClick={()=>this.setSort('date')}>NEW</a>&nbsp;
            <a href="#" className={this.currSort('score')} onClick={()=>this.setSort('score')}>SCORE</a>&nbsp;
            <a href="#" className={this.currSort('title')} onClick={()=>this.setSort('title')}>TITLE</a>
          </div>
          <div className="col-xs-12">
            {this.displayPost().map(p=>{
              return <PostDisplay post={p}></PostDisplay>
            })}
          </div>
        </div>
      </div>)
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories: categories,
    posts: (posts => {
      let p = Object.values(posts).sort((a,b)=>{
        console.log(this.state)
      })

      console.log("POSTS", p)
      return p
    })(posts)
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
