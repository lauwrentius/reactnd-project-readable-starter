import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import './app.css';

import NavHeader from 'components/navHeader/navHeader'
import PostListings from 'components/postListings/postListings'
import PostDetails from 'components/postDetails/postDetails'
import PostForm from 'components/postForm/postForm'

class App extends Component {
  render() {
    const { addCal } = this.props

    return (
      <div className="App">
        <header>
          <div className="container">
            <NavHeader></NavHeader>
          </div>
        </header>
        <section className="container main-content">
          <Route exact path='/' component={PostListings}/>
          <Route exact path='/cat/:category' component={PostListings}/>

          <Route exact path='/post/:method/:param?' component={PostForm}/>
          <Route exact path='/postDetail/:id' component={PostDetails}/>
        </section>
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
