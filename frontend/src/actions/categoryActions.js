import API from 'utils/api'
import toObject from 'utils/helpers'

import {
  INIT_CATEGORY
} from './ActionTypes'

export function fetchCategory(){
  return (dispatch) => {
    API.getCategories().then(res=>{
      dispatch(initCategory(toObject(res.map(cat=>
        Object.assign(cat,{id: cat.path, path: `/${cat.path}`})))))
    })
  }
}

export function initCategory(category) {
  return {
    type: INIT_CATEGORY,
    category: category
  }
}
