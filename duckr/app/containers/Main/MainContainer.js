import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Router, Route, HashRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navigation } from 'components'
import { HomeContainer, AuthenticateContainer, FeedContainer,LogoutContainer } from 'containers'
import { container, innerContainer } from './MainContainer.css'
import restricted from 'hoc/restricted'

class MainContainer extends Component {
  render() {
    const { checkAuth } = this.props;
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={innerContainer}>
          <Switch>
            <Route path='/auth' component={restricted(AuthenticateContainer)}/>
            <Route path='/feed' component={restricted(FeedContainer)}/>
            <Route path='/logout' component={LogoutContainer}/>
            <Route component={restricted(HomeContainer)}/>
          </Switch>
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { isAuthed } = state;
  return {
    isAuthed
  }
}

export default connect(mapStateToProps)(MainContainer)
