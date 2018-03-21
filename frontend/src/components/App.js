import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

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

      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
