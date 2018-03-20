import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import { addCategory, addPost } from 'actions'
import './App.css';

import NavHeader from './navHeader/navHeader'
import PostListings from './postListings/postListings'
import PostDetails from './postDetails/postDetails'
import PostForm from './postForm/postForm'

class App extends Component {
  render() {
    const { addCal } = this.props

    return (
      <div className="App">
        <NavHeader></NavHeader>

        <Route exact path='/' component={PostListings}/>
        <Route exact path='/cat/:category' component={PostListings}/>

        <Route exact path='/post/:method/:param?' component={PostForm}/>
        <Route exact path='/postDetail/:id' component={PostDetails}/>



        <hr /><hr />
        <div className="container">
        {JSON.stringify(this.props.category)}
        <br /><br />
        {JSON.stringify(this.props.post)}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories: categories,
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCategory: (data) => dispatch(addCategory(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
