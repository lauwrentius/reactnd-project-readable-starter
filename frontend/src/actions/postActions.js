import API from 'utils/api'
import toObject from 'utils/helpers'

import {
  INIT_POST,
  ADD_POST,
  CLEAR_POST,
  EDIT_POST,
  DELETE_POST,
} from './actionTypes'

export function fetchPost(category=''){
  return (dispatch) => {
    API.getPosts(category).then(res=>{
      dispatch(initPost(toObject(res)))
    })
  }
}

export function initPost(post) {
  return {
    type: INIT_POST,
    post: post
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post: post
  }
}

export function clearPost() {
  return {
    type: CLEAR_POST,
    post: {}
  }
}
export function editPost(post) {
  return {
    type: EDIT_POST,
    post: post
  }
}
export function deletePost(post) {
  return {
    type: DELETE_POST,
    post: post
  }
}
