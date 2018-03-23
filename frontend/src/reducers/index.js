import { combineReducers } from 'redux'

import {
  INIT_CATEGORY,
  ADD_POST,
  CLEAR_POST,
  EDIT_POST,
  DELETE_POST,
  INIT_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  CLEAR_COMMENT
} from '../actions'

function categories (state = {}, action) {
  const { category } = action

  switch (action.type){
    case INIT_CATEGORY:
      return category

    default:
      return state
  }
}
function posts (state = {}, action) {
  const { post, comment} = action

  switch (action.type){
    case ADD_POST:
      return {
        ...state,
        [post.id]: post,
      }
    case EDIT_POST:
      return Object.assign({}, state, {[post.id]:post})

    case ADD_COMMENT:
    case DELETE_COMMENT:
      let p = Object.assign({}, state[comment.parentId])
      p['commentCount'] += (action.type === ADD_COMMENT)? 1 : -1

      return Object.assign({}, state, {[p.id]:p})

    case DELETE_POST:
      return Object.assign({},
        ...Object.values(state)
          .filter(p=>(p.id !== post.id))
          .map(p=> ({[p.id]:p})))

    case CLEAR_POST:
      return {}

    default:
      return state
  }
}
function comments (state={}, action){
  const { comment } = action

  switch (action.type){
    case INIT_COMMENT:
      return comment

    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment,
      }
    case EDIT_COMMENT:
      return Object.assign({}, state, {[comment.id]:comment})

    case DELETE_COMMENT:
      return Object.assign({},
        ...Object.values(state)
          .filter(c=>(c.id !== comment.id))
          .map(c=> ({[c.id]:c})))

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
