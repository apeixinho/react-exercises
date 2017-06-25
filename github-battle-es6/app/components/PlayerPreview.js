import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview(props) {
  const {avatar, username}  = props;
  return (
    <div>
      <div className='column'>
        <img className='avatar'
             src={avatar}
             alt={'Avatar for ' + username}/>
        <h2 className='username'>
          @{username}
        </h2>
        {props.children}
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default PlayerPreview;