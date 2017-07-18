import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Router, Route, HashRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import { Navigation } from 'components'
import { HomeContainer, AuthenticateContainer, FeedContainer,LogoutContainer } from 'containers'
import { container, innerContainer } from './MainContainer.css'
import restricted from 'hoc/restricted'

class MainContainer extends Component {

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user)=> {
      if (user) {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(user.displayName, userData.photoURL, user.uid);
        this.props.authUser(user.uid);
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());
        if (this.props.location.pathname === '/') {
          this.props.history.replace('feed');
        }
      } else {
        this.props.removeFetchingUser();
      }
    })
  }

  render() {
    const { checkAuth, isFetching } = this.props;
    return isFetching === true ?
      null
      :
      (
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
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { isAuthed, isFetching } = state;
  return {
    isAuthed,
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))
