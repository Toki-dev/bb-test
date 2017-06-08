import { POSTS_LOADED, USERS_LOADED, COMMENTS_LOADED, DELETE_POST } from './PostsActions'

// ------------------------------------
// My Reducers
// ------------------------------------

const defaultState = []

export function posts (state = defaultState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return action.payload
    case DELETE_POST:
      return state.filter((t) => {
        if (t.id !== action.payload) return t
      })
    default:
      return state
  }
}

export function users (state = defaultState, action) {
  switch (action.type) {
    case USERS_LOADED:
      return action.payload
    default:
      return state
  }
}

export function comments (state = defaultState, action) {
  switch (action.type) {
    case COMMENTS_LOADED:
      return action.payload
    default:
      return state
  }
}
