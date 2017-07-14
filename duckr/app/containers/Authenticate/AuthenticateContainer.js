import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {

  constructor(props) {
    super(props);

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    const { authUser, fetchingUser,fetchingUserSuccess, fetchingUserFailure} = this.props;

    fetchingUser();
    auth().then((user)=> {
        fetchingUserSuccess(user.uid, user, Date.now());
        authUser(user.uid);
        console.log('Authed user', user)
      })
      .catch((error)=>fetchingUserFailure(error))
  }

  render() {
    const { isFetching, error } = this.props;
    return (
      <Authenticate isFetching={isFetching}
                    error={error}
                    onAuth={this.handleAuth}/>
    );
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUser: PropTypes.func.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    isFetching,
    error
    } = state;
  return {
    isFetching,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)