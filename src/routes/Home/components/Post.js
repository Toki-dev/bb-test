import React, { Component } from 'react';
import Comments from './Comments';
import {Panel, Button} from 'react-bootstrap';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }
  
  loadComment(comments) {
    this.setState({comments})
  }
  
  render() {
    const { users, loadComments, userId, title, body, id, deletePost } = this.props;
    const { comments } = this.state;
    let user = null;
    if (users) user = users.filter(u => u.id == userId);
    let l = null;
    let c = comments.length ? comments : null;
    
    
    if (c && c.length) {
      l = (
        <Comments
          comments={c}
        />
      )
    }
    
    
    return (
  <Panel>
      <div className="post">
      <div className="post-top">
        <h2   onClick={e => loadComments(id).then(res => {
          this.loadComment(res.data)
        })}>{title}</h2>
        <span>Username: {user ? user[0].username : null }</span>
        <p>{body}</p>
      </div>
        <div>
        <br/>
        <Button
          bsStyle="danger"
          onClick={e=>deletePost(id)}>Delete</Button>
        {l}
        </div>
      </div>
  </Panel>
    )
    
  };
  
}

export default Post;