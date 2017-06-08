import axios from 'axios';
const root = 'https://jsonplaceholder.typicode.com';
// ------------------------------------
// Constants
// ------------------------------------
export const POSTS_LOADED = 'POSTS_LOADED';
export const USERS_LOADED = 'USERS_LOADED';
export const COMMENTS_LOADED = 'COMMENTS_LOADED';
export const DELETE_POST = 'DELETE_POST';
export const FILTER = 'FILTER';

// ------------------------------------
// Actions
// -

export function postsLoaded (data) {
  return {
    type    : POSTS_LOADED,
    payload : data
  }
}

export function usersLoaded (data) {
  return {
    type    : USERS_LOADED,
    payload : data
  }
}

export function commentsLoaded (data) {
  return {
    type    : COMMENTS_LOADED,
    payload : data
  }
}


export function loadComments(id) {
  return dispatch =>  axios({
    method: 'get',
    url: `${root}/comments?postId=1${id}`,
  }).then(console.log("jdkdh"))
}

export function filter (data) {
  return {
    type    : FILTER,
    payload : data
  }
}

export function deletePost (id) {
  return {
    type    : DELETE_POST,
    payload : id
  }
}
