import API from 'utils/api'
import toObject from 'utils/helpers'

import {
  INIT_COMMENT,
  ADD_COMMENT,
  CLEAR_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT
} from './actionTypes'

export function initComment(comment) {
  return {
    type: INIT_COMMENT,
    comment: comment
  }
}
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment: comment
  }
}
export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment: comment
  }
}
export function deleteComment(id) {
  return (dispatch) => {
    API.deleteComment(id).then(res =>{
      dispatch(removeComment(res))
    })
  }
}
export function removeComment(comment) {
  return {
    type: REMOVE_COMMENT,
    comment: comment
  }
}
export function clearComment() {
  return {
    type: CLEAR_COMMENT,
    post: {}
  }
}
