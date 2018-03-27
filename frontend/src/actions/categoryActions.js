import API from 'utils/api'
import toObject from 'utils/helpers'

import {
  INIT_CATEGORY
} from './actionTypes'

/**
* @description Fetch the available categories, calls the API.
*/
export function fetchCategory(){
  return (dispatch) => {
    return API.getCategories().then(res=>{
      return dispatch(initCategory(toObject(res.map(cat=>
        Object.assign(cat,{id: cat.path, path: `/${cat.path}`})))))
    })
  }
}
/**
* @description Init categories action.
* @param {Object} category - Object collection of categories
*/
export function initCategory(category) {
  return {
    type: INIT_CATEGORY,
    category: category
  }
}
