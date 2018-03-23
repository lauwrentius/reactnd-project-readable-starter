import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'

import './app.css';

import NavHeader from 'components/navHeader/navHeader'
import PostListings from 'components/postListings/postListings'
import PostDetails from 'components/postDetails/postDetails'
import NotFound from 'components/notFound/notFound'
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
          <Switch>
            <Route exact path='/' component={PostListings} />
            <Route exact path='/404' component={NotFound} />
            <Route exact path='/addPost/:category?' component={PostForm}/>
            
            <Route exact path='/:category' component={PostListings}/>
            <Route exact path='/:category/:id' component={PostDetails}/>
            <Route exact path='/:category/:id/edit' component={PostForm}/>
          </Switch>
        </section>
      </div>
    )
  }
}


export default withRouter(App)
