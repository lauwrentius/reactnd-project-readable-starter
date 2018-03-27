import API from 'utils/api'
import toObject from 'utils/helpers'
import uuidv1 from 'uuid/v1'

import {
  INIT_POST,
  ADD_POST,
  CLEAR_POST,
  EDIT_POST,
  DELETE_POST,
} from './actionTypes'

/**
* @description Fetch list of posts.
* @param {string} category - Category of the post.
*/
export function fetchPost(category){
  return (dispatch) => {
    return API.getPosts(category).then(res=>{
      return dispatch(asyncCallback(INIT_POST, toObject(res)))
    })
  }
}

/**
* @description Fetch posts by id.
* @param {id} string - post id.
*/
export function fetchPostDetails(id){
  return (dispatch) => {
    return API.getPostDetails(id).then(res=>{
      if(Object.keys(res).length === 0 || res.error)
        res = {id, error:"Error"}
      return dispatch(asyncCallback(INIT_POST, toObject([res])))
    })
  }
}

/**
* @description Adds new post
* @param {Object} post - Object consists of title, body, author, and category
*/
export function addPost(post) {
  return (dispatch) => {
    return API.addPost({
      id: uuidv1(),
      timestamp: Date.now(),
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    }).then(res=>{
      return dispatch(asyncCallback(ADD_POST,res))
    })
  }
}

/**
* @description Edit post - async callback
* @param {Object} post - Object consists of id, title, and body
*/
export function editPost(post) {
  const {id,title,body} = post
  return (dispatch) =>{
    return API.editPost(id, {title, body}).then(res=>{
      return dispatch(asyncCallback(EDIT_POST,res))
    })
  }
}

/**
* @description Delete post.
* @param {string} id - post's id
*/
export function deletePost(id) {
  return (dispatch) => {
    return API.deletePost(id).then(res=>{
      return dispatch(asyncCallback(DELETE_POST,res))
    })
  }
}

/**
* @description Vote post.
* @param {Object} post - Object post's: id, and option (upvote/downvote)
*/
export function votePost(post){
  const {id,option} = post

  return (dispatch) => {
    return API.votePost(id, {option}).then(res =>{
      return dispatch(asyncCallback(EDIT_POST,res))
    })
  }
}

/**
* @description Clears post store.
*/
export function clearPost() {
  return {
    type: CLEAR_POST,
    post: {}
  }
}

/**
* @description Generic callback function callback for async calls resolution.
*/
function asyncCallback(type, post){
  return {type, post}
}
