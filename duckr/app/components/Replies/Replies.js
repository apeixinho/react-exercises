import React from 'react'
import PropTypes from 'prop-types'

import {
  avatar, replyContainer, header,
  cushion, center, author } from './Replies.css'
import { formatTimestamp } from 'helpers/utils'
import { errorMsg } from 'sharedStyles/styles.css'

function Reply({comment}) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar}/>
      <div>
        <div className={author}>{comment.name}</div>
        <div className={cushion}>{formatTimestamp(comment.timestamp)}</div>
        <div className={cushion}>{comment.reply}</div>
      </div>
    </div>
  )
}

Reply.propTypes = {
  comment: PropTypes.object.isRequired,
}

function Replies({replies, error, isFetching}) {
  const replyIds = Object.keys(replies)
  return (
    <div>
      {error ? <h3 className={errorMsg}>{error}</h3> : null}
      {isFetching === true
        ? <p>{'Fetching Replies'}</p>
        : <div>
        <h1 className={header}>{'Replies'}</h1>
        {replyIds.map((replyId) => (
          <Reply key={replyId} comment={replies[replyId]}/>
        ))}
      </div>}
      {replyIds.length === 0 ? <h3 className={center}>{'Be the first to comment.'}</h3> : null}
    </div>
  )
}

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object
}

export default Replies