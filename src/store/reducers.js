import { combineReducers } from 'redux'
import locationReducer from './location'

import { posts, users, comments } from '../routes/Home/components/PostReducers'

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    posts: posts,
    users: users,
    comments: comments,

  })
}

export default makeRootReducer
