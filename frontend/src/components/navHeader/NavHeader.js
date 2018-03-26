import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter,NavLink} from 'react-router-dom'

import { fetchCategory } from 'actions'

/**
* @description Header section for the app.
* Displays links to all of the available post categories
*/
class NavHeader extends Component {

  /**
  * @description Fetch all of the available categories
  */
  componentWillMount = () => {
    this.props.fetchCategory()
  }

  /**
  * @description Renders the component.
  */
  render() {
    const { categories } = this.props
    const nav = [{name:'all', path:'/', exact: true}].concat(Object.values(categories))

    return (<div className="navHeader">
            {nav.map(i=>{
              return <NavLink
                  key={i.name}
                  exact={i.exact}
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
    fetchCategory: () => dispatch(fetchCategory())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader))
