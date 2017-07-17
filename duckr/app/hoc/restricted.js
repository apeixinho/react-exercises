import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { checkIfAuthed } from 'helpers/auth';
import { connect } from 'react-redux'

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export default function restricted(BaseComponent) {

  class Restricted extends Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    checkAuthentication(params) {
      const { history } = params;
      const isAuthed = checkIfAuthed(this.props.isAuthed);

      const nextPathName = params.location.pathname;
      if (nextPathName === '/' || nextPathName === '/auth') {
        if (isAuthed === true) {
          history.replace('/feed')
        }
      } else {
        if (isAuthed !== true) {
          history.replace('/auth')
        }
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    const {isAuthed } = state;
    return {
      isAuthed
    }
  }

  return withRouter(connect(mapStateToProps)(Restricted));
}