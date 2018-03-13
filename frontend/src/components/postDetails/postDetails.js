import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {postDetails} from 'utils/api'

class PostDetails extends Component {
  state = {
    post: {}
  }
  componentWillMount() {
    let id = this.props.history.location.pathname.split('/')[2]
    console.log("MOUNT", id)
    postDetails(id).then(res=>{
      console.log("DETAILS", res)
      this.setState({post: res})
    })
  }

  getPostDetails = () => {
    let id = this.props.history.location.pathname.split('/')[2]

  }

  render() {
    const { post } = this.state

    return <div>{JSON.stringify(post)}
      </div>
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails))
