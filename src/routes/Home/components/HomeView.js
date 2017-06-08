import React from 'react'
import './HomeView.scss'
import axios from 'axios'
import { FormGroup, ControlLabel, FormControl, Form, Col, Jumbotron, Button } from 'react-bootstrap'
import Post from './Post'
import ResultFilter from './ResultFilter'

const root = 'https://jsonplaceholder.typicode.com'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedUserId:'',
      filter: '',
    }
  }

  componentWillMount () {
    axios({
      method: 'get',
      url: `${root}/posts`,
    }).then(res => this.props.postsLoaded(res.data))

    axios({
      method: 'get',
      url: `${root}/users`,
    }).then(res => this.props.usersLoaded(res.data))
  }

  onSearch (filter) {
    // eslint-disable-next-line no-console
    console.log('onSearch: ', filter)
    this.setState({ filter })
  }

  select (e) {
    this.setState({ selectedUserId: e.target.value })
  }

  clearFilter () {
    this.setState({ selectedUserId: null })
  }

  render () {
    const { selectedUserId, filter } = this.state
    const { posts, users, loadComments, deletePost } = this.props
    let filtered
    if (selectedUserId) {
      filtered = posts.filter(r => { if (selectedUserId && selectedUserId == r.userId) return r })
    } else { filtered = posts }

    const match = (r) => {
      const k = r.value || r.title
      function filter2 (text, searchString) {
        const regexStr = '(?=.*' + searchString.join(')(?=.*') + ')'
        const searchRegEx = new RegExp(regexStr, 'gi')
        return text.match(searchRegEx) !== null
      }
      return filter2(k, filter)
    }
    return (
      <div>
        <Jumbotron>
          <Form inline>

            <Col sm={6}>
              <Col componentClass={ControlLabel} sm={1}>
                <label>Select</label>
              </Col>

              <select className='select-box' placeholder='Select' onChange={(e) => { this.select(e) }}>
                {users.map((o) => <option key={o.id} value={o.id}>{o.username}</option>)}
              </select>
              <Button className='clear-button' onClick={() => { this.clearFilter() }}>X</Button>
            </Col>

            <Col sm={6}>
              <Col componentClass={ControlLabel} sm={1}>
                <ControlLabel>Filter</ControlLabel>
              </Col>
              <Col sm={5}>
                <ResultFilter
                  onSearch={(searchKey) => { this.onSearch(searchKey) }}
                  filter={filter}
              />
              </Col>
            </Col>

          </Form>
        </Jumbotron>
        <div>

          {filtered
            .filter(r => (!filter || filter && match(r)))
            .map((r) => (
              <Post
                key={r.id}
                title={r.title}
                body={r.body}
                userId={r.userId}
                users={users}
                id={r.id}
                loadComments={loadComments}
                deletePost={deletePost}
              />
            ))
          }
        </div>

      </div>
    )
  }
}

export default HomeView
