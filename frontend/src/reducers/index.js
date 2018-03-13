import { combineReducers } from 'redux'

import {
  ADD_CATEGORY,
  ADD_POST,
  EDIT_POST,
  CLEAR_POST
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

export default combineReducers({
  categories,
  posts
})
