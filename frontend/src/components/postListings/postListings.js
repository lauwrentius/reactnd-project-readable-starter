import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addPost, clearPost } from 'actions'
import API from 'utils/api'

import PostDisplay from 'components/postDisplay/postDisplay'

class PostListings extends Component {
  state = {
    sort: 'SCORE',
    sortArr: ["NEW","SCORE","TITLE"]
  }
  componentWillMount() {
    this.loadPost()
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.location.pathname !== prevProps.location.pathname)
      this.loadPost()
  }

  loadPost(){
    const { path, params } = this.props.match

    this.props.clearPost()
    if(path === '/'){
      API.getPosts().then(res=>{
        res.map(post=>this.props.addPost(post))
      })
    }else{
      API.getPosts(params['category']).then(res=>{
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
      if(this.state.sort === 'NEW')
        return b.timestamp - a.timestamp

      if(this.state.sort === 'SCORE')
        return b.voteScore - a.voteScore

      return a.title.localeCompare(b.title);
    })
  }

  render() {
    const { posts, match } = this.props
    const { sort, sortArr } = this.state
    let category = (match.params.category)? match.params.category: ''

    return (<div className="postListings">
        <div className="sort-well well">
          sort by:&nbsp;
          {sortArr.map(s=> (
            <span><a data-sort={s}
              className={(sort === s)?'curr':''}
              onClick={this.setSort}>{s}</a>&nbsp;</span>
          ))}
          <div className="pull-right">
            <Link to={`/post/add/${category}`} className="btn btn-sm btn-primary">
              Add Post <span className="glyphicon glyphicon-plus"></span>
            </Link>
          </div>
        </div>
        {this.displayPost().length === 0 &&
          <div className="well">
            <h4>Sorry, no Posts in this category</h4>
          </div>
        }
        {this.displayPost().map(p=>{
          return <PostDisplay key={p.id} post={p}></PostDisplay>
        })}
      </div>)
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: Object.values(posts)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    clearPost: () => dispatch(clearPost())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListings)
