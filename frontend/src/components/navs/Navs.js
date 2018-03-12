import React, { Component } from 'react';
import { connect } from 'react-redux'
import {NavLink, Link} from 'react-router-dom'

import { addCategory } from 'actions'

class Navs extends Component {
  currNav = (nav) =>{
    // matchPath('/')
  }

  render() {
    const { categories } = this.props

    return (<div className="container header">
        <div className="row">
          <div className="col-xs-12">
            {Object.keys(categories).map(cat=>{
              let name = categories[cat]['name']
              let path = categories[cat]['path']

              return <span key={path}>
                <NavLink
                  exact
                  activeClassName="curr"
                  to={path}>{name}
                </NavLink>{'\u00A0'}</span>
            })}
            <hr />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navs)
