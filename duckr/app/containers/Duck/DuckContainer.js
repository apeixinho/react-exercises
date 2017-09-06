import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Duck } from 'components'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'

class DuckContainer extends Component {

  constructor(props) {
    super(props);

    this.goToProfile = this.goToProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  goToProfile(event) {
    event.stopPropagation();
    this.props.history.push('/' + this.props.duck.uid)
  }

  handleClick(event) {
    event.preventDefault();
    this.props.history.push('/duckDetail/' + this.props.duck.duckId)
  }

  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props} />    )
  }
}

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true
}

DuckContainer.propTypes = {
  duck: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
  hideLikeCount: PropTypes.bool.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  numberOfLikes: PropTypes.number,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
}

function mapStateToProps(state, props) {
  const { ducks, likeCount, usersLikes } = state;

  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(usersLikesActionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DuckContainer));
