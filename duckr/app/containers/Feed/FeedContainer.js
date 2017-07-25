import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends Component {

  componentDidMount() {
    this.props.setAndHandleFeedListener();
  }

  render() {
    return (
      <Feed newDucksAvailable={this.props.newDucksAvailable}
            error={this.props.error}
            isFetching={this.props.isFetching}
            resetNewDucksAvailable={this.props.resetNewDucksAvailable} />
    )
  }
}

FeedContainer.propTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired
}

function mapStateToProps({feed}) {
  const { newDucksAvailable, error, isFetching } = feed;

  return {
    newDucksAvailable,
    error,
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(feedActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
