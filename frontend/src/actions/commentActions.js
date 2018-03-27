import API from 'utils/api'
import uuidv1 from 'uuid/v1'
import toObject from 'utils/helpers'

import {
  INIT_COMMENT,
  ADD_COMMENT,
  CLEAR_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from './actionTypes'

/**
* @description Init Comments based on its postID.
* @param {String} postID - parent's post ID
*/
export function initComment(postID) {
  return (dispatch) => {
    return API.getPostComments(postID).then(res=>{
      return dispatch(asyncCallback(INIT_COMMENT,toObject(res)))
    })
  }
}

/**
* @description Adds new comment
* @param {Object} comment - Object consists of body, author, and parentID
*/
export function addComment(comment) {
  return (dispatch) => {
    return API.addComment({
      id: uuidv1(),
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    }).then(res =>{
      return dispatch(asyncCallback(ADD_COMMENT,res))
    })
  }
}

/**
* @description Edit comment - async callback
* @param {Object} comment - Object consists of comment's id, body, timestamp
*/
export function editComment(comment) {
  const {id, timestamp, body} = comment
  return (dispatch) => {
    return API.editComment(id, {body, timestamp}).then(res=>{
      return dispatch(asyncCallback(UPDATE_COMMENT,res))
    })
  }
}

/**
* @description Update comment. Called to update comment's edit state.
*   No async calls on this action
* @param {Object} comment
*/
export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment: comment
  }
}

/**
* @description Delete comment.
* @param {string} id - comment's id
*/
export function deleteComment(id) {
  return (dispatch) => {
    return API.deleteComment(id).then(res =>{
      return dispatch(asyncCallback(DELETE_COMMENT,res))
    })
  }
}

/**
* @description Vote comment.
* @param {Object} comment - Object comment's: id, and option (upvote/downvote)
*/
export function voteComment(comment){
  const {id,option} = comment

  return (dispatch) => {
    return API.voteComment(id, {option}).then(res =>{
      return dispatch(asyncCallback(UPDATE_COMMENT,res))
    })
  }
}

/**
* @description Clears comment store.
*/
export function clearComment() {
  return {
    type: CLEAR_COMMENT,
    post: {}
  }
}

/**
* @description Generic callback function callback for async calls resolution.
*/
function asyncCallback(type, comment){
  return {type, comment}
}
