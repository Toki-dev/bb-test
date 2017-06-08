import React, { Component } from 'react'
import Comment from './Comment'

const Comments = ({ comments }) => {
  return (
    <div
      className='comments'
    >
      <h4>Comments</h4>
      <div>
        {comments
          .map((r) => (
            <Comment
              key={r.id}
              name={r.name}
              body={r.body}
            />

          ))
        }
      </div>
    </div>
  )
}

export default Comments
