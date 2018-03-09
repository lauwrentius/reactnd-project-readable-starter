import { combineReducers } from 'redux'

import {
  ADD_CATEGORY
} from '../actions'

function category (state = {}, action) {
  switch (action.type){
    case ADD_CATEGORY:

    default:
      return state
  }
}

export default combineReducers({
  category
})
