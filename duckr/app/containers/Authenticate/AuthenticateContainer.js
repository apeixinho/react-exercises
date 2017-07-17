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
    this.props.fetchAndHandleAuthedUser();
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
  fetchAndHandleAuthedUser: PropTypes.func.isRequired
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