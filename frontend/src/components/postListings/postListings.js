import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

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

    // this.props.history.listen((location, action) => {
    //   console.log("hist",location)
    //   if (this.props.location !== prevProps.location) {
    //     this.loadPost()
    //   }
    // })
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

    return (<div className="container postListings">
        <div className="row">
          <div className="col-xs-12">
            sort by:&nbsp;
            <a data-sort="date"
              className={this.currSort("date")}
              onClick={this.setSort}>NEW</a>&nbsp;
            <a data-sort="score"
              className={this.currSort("score")}
              onClick={this.setSort}>SCORE</a>&nbsp;
            <a data-sort="title"
              className={this.currSort("title")}
              onClick={this.setSort}>TITLE</a>
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
