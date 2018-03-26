import API from 'utils/api'
import uuidv1 from 'uuid/v1'

import {
  INIT_COMMENT,
  ADD_COMMENT,
  CLEAR_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from './ActionTypes'

export function initComment(comment) {
  return {
    type: INIT_COMMENT,
    comment: comment
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
