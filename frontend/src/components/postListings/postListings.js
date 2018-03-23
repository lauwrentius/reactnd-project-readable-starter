import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PostDisplay from 'components/postDisplay/postDisplay'
import { addPost, clearPost } from 'actions'
import API from 'utils/api'


/**
* @description Displays a list of posts for a categories.
* Users are able to sort comments based on score and date,
*/
class PostListings extends Component {
  state = {
    sort: 'SCORE',
    sortArr: ["NEW","SCORE","TITLE"]
  }

  /**
  * @description loads posts on mount
  */
  componentWillMount() {
    this.loadPost()
  }

  /**
  * @description Calls the api to load all posts whenever a category is changed
  */
  componentDidUpdate(prevProps, prevState){
    if (this.props.location.pathname !== prevProps.location.pathname)
      this.loadPost()
  }

  /**
  * @description Calls the api to load postsaccording to the category
  */
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

  /**
  * @description change the post sort system
  */
  setSort = (e) => {
    this.setState({sort: e.currentTarget.dataset.sort})
  }

  /**
  * @description returns a sorted array to be displaed by the component.
  */
  displayPost = () => {
    return this.props.posts.sort( (a,b) => {
      if(this.state.sort === 'NEW')
        return b.timestamp - a.timestamp

      if(this.state.sort === 'SCORE')
        return b.voteScore - a.voteScore

      return a.title.localeCompare(b.title);
    })
  }

  /**
  * @description This function will render the application.
  */
  render() {
    const { match } = this.props
    const { sort, sortArr } = this.state
    let category = (match.params.category)? match.params.category: ''

    return (<div className="postListings">
        <div className="sort-well well">
          sort by:&nbsp;
          {sortArr.map((s,i)=> (
            <span key={i}><a data-sort={s}
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
          return <PostDisplay key={p.id} id={p.id}></PostDisplay>
        })}
      </div>)
  }
}

/**
* @description Connects the store to the component.
*/
function mapStateToProps ({ posts }) {
  return {
    posts: Object.values(posts)
  }
}

/**
* @description Dispatch actions to the store.
*/
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
