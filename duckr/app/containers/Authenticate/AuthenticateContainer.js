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

  handleAuth(e) {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser()
      .then(()=> this.context.router.history.replace('feed'));
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

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    users:{
      isFetching,
      error
      }
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