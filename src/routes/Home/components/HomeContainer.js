import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PostsActions from './PostsActions'
import HomeView from './HomeView'

function mapStateToProps (state) {
  const { posts, users, comments } = state
  return {
    posts, users, comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postsLoaded: bindActionCreators(PostsActions.postsLoaded, dispatch),
    usersLoaded: bindActionCreators(PostsActions.usersLoaded, dispatch),
    loadComments: bindActionCreators(PostsActions.loadComments, dispatch),
    deletePost: bindActionCreators(PostsActions.deletePost, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
