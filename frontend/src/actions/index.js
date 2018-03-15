export const ADD_CATEGORY = 'ADD_CATEGORY'

export const ADD_POST = 'ADD_POST'
export const CLEAR_POST = 'CLEAR_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const CLEAR_COMMENT = 'CLEAR_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category: category
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
export function clearComment() {
  return {
    type: CLEAR_COMMENT,
    post: {}
  }
}
