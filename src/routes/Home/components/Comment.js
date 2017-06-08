import React, { Component } from 'react'

const Comment = ({ name, body }) => {
  return (
    <div
      className='comment'
    >
      <h5>{name}</h5>
      <p>{body}</p>

    </div>
  )
}

export default Comment
