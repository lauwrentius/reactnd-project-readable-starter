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

export function initComment(postID) {
  return (dispatch) => {
    API.getPostComments(postID).then(res=>{
      dispatch((comment =>({
        type: INIT_COMMENT,
        comment: comment
      }))(toObject(res)))
    })
  }
}
export function addComment(comment) {
  return (dispatch) => {
    API.addComment({
      id: uuidv1(),
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    }).then(res =>{
      dispatch((comment=>({
          type: ADD_COMMENT,
          comment: comment
      }))(res))
    })
  }
}
export function editComment(comment) {
  return (dispatch) => {
    API.editComment(comment.id, comment).then(res=>{
      dispatch(updateComment(res))
    })
  }
}
export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment: comment
  }
}
export function deleteComment(id) {
  return (dispatch) => {
    API.deleteComment(id).then(res =>{
      dispatch((comment=>({
        type: DELETE_COMMENT,
        comment: comment
      }))(res))
    })
  }
}
export function clearComment() {
  return {
    type: CLEAR_COMMENT,
    post: {}
  }
}
