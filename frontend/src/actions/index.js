export const ADD_CATEGORY = 'ADD_CATEGORY'

export const ADD_POST = 'ADD_POST'
export const CLEAR_POST = 'RESET_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const ADD_COMMENTS = 'ADD_COMMENTS'
export const EDIT_COMMENTS = 'EDIT_COMMENTS'
export const DELETE_COMMENTS = 'DELETE_COMMENTS'

export function addCategory (category) {
  return {
    type: ADD_CATEGORY,
    category: category
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post: post
  }
}

export function clearPost () {
  return {
    type: CLEAR_POST,
    post: {}
  }
}
