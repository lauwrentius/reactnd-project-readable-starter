import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter,NavLink} from 'react-router-dom'

import { addCategory } from 'actions'
import { getCategories } from 'utils/api'

class NavHeader extends Component {
  componentWillMount = () => {
    getCategories().then(res=>{
      res.map(cat=>this.props.addCategory(cat))
    })
  }
  render() {
    const { categories } = this.props

    return (<div className="navHeader">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {Object.keys(categories).map(cat=>{
              let name = categories[cat]['name']
              let path = categories[cat]['path']

              return <NavLink
                  key={path}
                  exact
                  activeClassName="curr"
                  to={path}>{name}
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
    categories:  Object.keys(categories).reduce( (prev, curr) => {
      console.log("REDUCE",prev, curr)
      prev[curr] = { name: categories[curr].name,
        path: '/cat/'+categories[curr].path }

      return prev}, {all:{name:'all',path:'/'}})
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCategory: (data) => dispatch(addCategory(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader))
