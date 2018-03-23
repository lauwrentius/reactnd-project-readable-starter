import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'

import './app.css';

import NavHeader from 'components/navHeader/navHeader'
import PostListings from 'components/postListings/postListings'
import PostDetails from 'components/postDetails/postDetails'
import PostForm from 'components/postForm/postForm'

/**
* @description Udacity Readable App.
*  This class handles components to be displayed via routes.
*/
class App extends Component {

  /**
  * @description This function will render the application.
  */
  render() {
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


export default withRouter(App)
