import { combineReducers } from 'redux'

import {
  ADD_CATEGORY,
  ADD_POST,
  EDIT_POST,
  CLEAR_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  CLEAR_COMMENT
} from '../actions'

function categories (state = {}, action) {
  switch (action.type){
    case ADD_CATEGORY:
      const { category } = action
      return {
        ...state,
        [category.name]: category,
    }
    default:
      return state
  }
}
function posts (state = {}, action) {
  const { post } = action

  switch (action.type){
    case ADD_POST:
      return {
        ...state,
        [post.id]: post,
      }

    case EDIT_POST:
      return Object.assign({}, state, {[post.id]:post})

    case CLEAR_POST:
      return {}

    default:
      return state
  }
}
function comments (state={}, action){
  const { comment } = action

  switch (action.type){
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment,
      }
    case EDIT_COMMENT:
      return Object.assign({}, state, {[comment.id]:comment})
    case CLEAR_COMMENT:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
