import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter,Route } from 'react-router-dom'

import { addCategory, addPost } from 'actions'
import './App.css';

import NavHeader from './navHeader/navHeader'
import PostListings from './postListings/postListings'
import PostDetails from './postDetails/postDetails'
import { getCategories } from 'utils/api'

class App extends Component {
  componentDidMount = () => {
    let url = 'http://localhost:3001'

    getCategories().then(res=>{
      res.map(cat=>this.props.addCategory(cat))
    })
    // getPosts('react').then(res=>{
    //   console.log("react",res)
    // })
    // getPosts('redux').then(res=>{
    //   console.log("redux",res)
    // })
    // getPosts('udacity').then(res=>{
    //   console.log("udacity",res)
    // })
  //   fetch(url+'/categories',{
  //     headers: {
  //       'Authorization': 'whatever-you-want'
  //     },
  //     method: 'GET'
  //   }).then( response =>{
  //     response.json().then(data=>{
  //       console.log(data.categories)
  //       data.categories.map( (cat) => {
  //         this.props.addCategory({name:cat.name, path:cat.path})
  //       })
  //     })
  //   })
  //   fetch(url+'/posts',{
  //     headers: {
  //       'Authorization': 'whatever-you-want'
  //     },
  //     method: 'GET'
  //   }).then( response =>{
  //     response.json().then(data=>{
  //       console.log(data)
  //       data.map( (post) => {
  //         this.props.addPost(post)
  //       })
  //     })
  //   })
  }
  componentDidUpdate = (prevProps, prevState) => {
    console.log('next',prevProps)
  }

  render() {
    const { addCal } = this.props

    return (
      <div className="App">
        <NavHeader></NavHeader>

        <Route exact path='/' render={() =>
          (<PostListings></PostListings>)}/>

        <Route exact path='/cat/:path' render={() =>
          (<PostListings></PostListings>)}/>

        <Route exact path='/post/:id' render={() =>
          (<PostDetails></PostDetails>)}/>

        <hr /><hr />
        <div className="container">
        {JSON.stringify(this.props.category)}
        <br /><br />
        {JSON.stringify(this.props.post)}
        </div>
        {/*header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
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
