import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
const { func, object, string, bool } = PropTypes

class DuckDetailsContainer extends Component {

  componentDidMount() {
    this.props.initLikeFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  }

  render() {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        error={this.props.error}
        isFetching={this.props.isFetching}/>
    )
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: object.isRequired,
  duckId: string.isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  removeFetching: func.isRequired,
  fetchAndHandleDuck: func.isRequired,
  duckAlreadyFetched: bool.isRequired,
  initLikeFetch: func.isRequired
}

function mapStateToProps({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.match.params.duckId,
    duckAlreadyFetched: !!ducks[props.match.params.duckId]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer)