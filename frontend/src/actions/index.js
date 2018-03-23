// import { * } from './commentActions'
// import * from './postActions'
// import * from './categoryActions'
// import * from './categoryActions'

export * from './commentActions'
export * from './postActions'
export * from './categoryActions'
export * from './actionTypes'

// import API from 'utils/api'
// import toObject from 'utils/helpers'
//
// import {
//   INIT_CATEGORY,
//   INIT_POST,
//   ADD_POST,
//   CLEAR_POST,
//   EDIT_POST,
//   DELETE_POST,
//   INIT_COMMENT,
//   ADD_COMMENT,
//   CLEAR_COMMENT,
//   EDIT_COMMENT,
//   REMOVE_COMMENT
// } from './actionTypes'
//
// export function fetchCategory(){
//   return (dispatch) => {
//     API.getCategories().then(res=>{
//       dispatch(initCategory(toObject(res.map(cat=>
//         Object.assign(cat,{id: cat.path, path: `/${cat.path}`})))))
//     })
//   }
// }
//
// export function initCategory(category) {
//   return {
//     type: INIT_CATEGORY,
//     category: category
//   }
// }
//
// export function fetchPost(category=''){
//   return (dispatch) => {
//     API.getPosts(category).then(res=>{
//       dispatch(initPost(toObject(res)))
//     })
//   }
// }
//
// export function initPost(post) {
//   return {
//     type: INIT_POST,
//     post: post
//   }
// }
//
// export function addPost(post) {
//   return {
//     type: ADD_POST,
//     post: post
//   }
// }
//
// export function clearPost() {
//   return {
//     type: CLEAR_POST,
//     post: {}
//   }
// }
// export function editPost(post) {
//   return {
//     type: EDIT_POST,
//     post: post
//   }
// }
// export function deletePost(post) {
//   return {
//     type: DELETE_POST,
//     post: post
//   }
// }
