import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter,NavLink} from 'react-router-dom'

import { initCategory } from 'actions'
import API from 'utils/api'

/**
* @description Header section for the app.
* Displays links to all of the available post categories
*/
class NavHeader extends Component {

  /**
  * @description Calls the api to load all of the available categories
  */
  componentWillMount = () => {
    API.getCategories().then(res=>{
      this.props.initCategory(res.reduce((obj,val)=> {
        val.path = `/cat/${val.path}`
        obj[val.name]=val
        return obj
      },{}))
    })
  }

  /**
  * @description Renders the component.
  */
  render() {
    const { categories } = this.props
    const nav = [{name:'all', path:'/'}].concat(Object.values(categories))

    return (<div className="navHeader">
            {nav.map(i=>{
              return <NavLink
                  key={i.name}
                  exact
                  activeClassName="curr"
                  to={i.path}>{i.name}
                </NavLink>
            })}
    </div>)
  }
}

/**
* @description Connects the store to the component.
*/
function mapStateToProps ({ categories }) {
  return {
    categories:  categories
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    initCategory: (data) => dispatch(initCategory(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader))
