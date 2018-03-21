import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter,NavLink} from 'react-router-dom'

import { initCategory } from 'actions'
import API from 'utils/api'

class NavHeader extends Component {
  componentWillMount = () => {
    API.getCategories().then(res=>{
      this.props.initCategory(res.reduce((obj,val)=> {
        val.path = `/cat/${val.path}`
        obj[val.name]=val
        return obj
      },{}))
    })
  }
  render() {
    const { categories } = this.props
    const nav = [{name:'all', path:'/'}].concat(Object.values(categories))

    return (<div className="navHeader">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {nav.map(i=>{
              return <NavLink
                  key={i.name}
                  exact
                  activeClassName="curr"
                  to={i.path}>{i.name}
                </NavLink>
            })}
          </div>
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps ({ categories }) {


  return {
    categories:  categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initCategory: (data) => dispatch(initCategory(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader))
