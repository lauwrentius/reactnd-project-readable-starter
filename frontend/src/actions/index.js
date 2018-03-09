export const ADD_CATEGORY = 'ADD_CATEGORY'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const ADD_COMMENTS = 'ADD_COMMENTS'
export const EDIT_COMMENTS = 'EDIT_COMMENTS'
export const DELETE_COMMENTS = 'DELETE_COMMENTS'

export function addCategory ({ id, name }) {
  return {
    id,
    name
  }
}

export function addPost ({ title, body, author, category }) {
  return {
    type: ADD_POST,
    id: 0,
    timetamp: Date.now(),
    title,
    body,
    author,
    category,
    voteScore: 1,
    deleted: false
  }
}
